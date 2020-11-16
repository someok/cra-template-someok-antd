const WebpackBar = require('webpackbar');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CracoAlias = require('craco-alias');

// Don't open the browser during development
process.env.BROWSER = 'none';

/**
 * 在根目录下配置 antd.customize，用于重新定义 antd 的 less 样式
 */
function getAntdTheme(themeFile = './antd.customize') {
    try {
        return require(themeFile);
    } catch (e) {
        return {};
    }
}

module.exports = function ({env}) {
    // 是否允许输出 Bundle Analyzer
    const enableBundleAnalyzerPlugin = process.env.BUNDLE_ANALYZER === 'true';

    const antdTheme = getAntdTheme();
    // console.log('antdTheme', antdTheme);

    const lessLoaderOptions = {
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: antdTheme,
        },
    };

    return {
        eslint: {
            enable: false,
        },

        webpack: {
            plugins: [
                new WebpackBar({profile: true}),
                ...(enableBundleAnalyzerPlugin
                    ? [
                          new BundleAnalyzerPlugin({
                              openAnalyzer: false,
                              analyzerMode: 'static',
                              generateStatsFile: true,
                              statsFilename: 'stats.json',
                          }),
                      ]
                    : []),

                new AntdDayjsWebpackPlugin(),

                new LodashModuleReplacementPlugin({
                    // 支持深度的 get\set\has 等
                    paths: true,
                    // 让 _.times 之类的方法可用
                    guards: true,
                }),
            ],
        },

        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true,
                    },
                    'antd',
                ],
                [
                    'import',
                    {
                        libraryName: 'react-use',
                        libraryDirectory: 'lib',
                        camel2DashComponentName: false,
                    },
                    'react-use',
                ],
                'lodash',
            ],
        },

        jest: {
            configure(config) {
                // 参见 https://ant.design/docs/react/use-with-create-react-app#Test-with-Jest
                config.transformIgnorePatterns.push(
                    '/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$'
                );

                return config;
            },
        },

        plugins: [
            {
                plugin: CracoAlias,
                options: {
                    source: 'jsconfig',
                    // baseUrl SHOULD be specified
                    // plugin does not take it from jsconfig
                    baseUrl: './src',
                },
            },

            // 增加 antd 支持，包括 node_modules 中的 less 解析
            // 不使用 craco-antd，此插件并没省多少事，还会默认导入 babel-plugin-import
            {
                plugin: CracoLessPlugin,
                // 使用下面配置的话 jest 会报 less 错误
                options: {
                    lessLoaderOptions,
                },
            },

            // 增加 src/**/*.module.less 支持
            {
                plugin: CracoLessPlugin,
                options: {
                    modifyLessRule: function (lessRule, _context) {
                        lessRule.test = /\.(module)\.(less)$/;
                        lessRule.exclude = /node_modules/;

                        return lessRule;
                    },
                    lessLoaderOptions,
                    cssLoaderOptions: {
                        modules: {
                            localIdentName:
                                env !== 'production'
                                    ? '[name]__[local]--[hash:base64:6]'
                                    : '[hash:base64]',
                        },
                    },
                },
            },
        ],
    };
};
