# cra-template-someok-antd

自定义的 create-react-app `v4` 模板，支持 antd、less 等配置

## 概述

本项目是使用 [Create React App](https://github.com/facebook/create-react-app) 自定义模板，并增加一些
自定义功能。

增加功能如下：

- 使用 [Craco](https://github.com/gsoft-inc/craco) 增强 CRA 功能
- 增加 less 支持，类似 CRA 的 SASS 模式，也支持 module 引用
- 整合 ant design，支持自定义 theme，配置文件为 `<root>/antd.customize.js`
- 整合 react-use、react-router-dom、dayjs、immer 等
- 支持 babel 打包时，按需引用 `antd`、`react-use`、`lodash`
- 支持在 `jsconfig.json` 中配置 alias
- 支持 `webpack-bundle-analyzer`
- 支持 `prettier`

## 使用方式

> npx create-react-app my-app --template someok-antd
