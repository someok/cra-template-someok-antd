import React from 'react';
import {BrowserRouter, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import dayjsLocale from 'dayjs/locale/zh-cn';

import AppRoutes from './AppRoutes';

// Antd DatePicker 之类的日期时间组件需要
dayjs.locale(dayjsLocale);

export const appHistory = createBrowserHistory({basename: process.env.PUBLIC_URL});

const App = () => (
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Router history={appHistory}>
                <AppRoutes />
            </Router>
        </BrowserRouter>
    </ConfigProvider>
);

export default App;
