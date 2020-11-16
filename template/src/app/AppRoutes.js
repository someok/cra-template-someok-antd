import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';

import {PageLoading} from '@/component';

export default function AppRoutes() {
    return (
        <Suspense fallback={<PageLoading />}>
            <Switch>
                <Route exact path="/" component={require('../page/HomePage').default} />

                <Route
                    path="/demo"
                    component={lazy(() =>
                        import(/* webpackChunkName: "app.demo" */ '../page/DemoPage')
                    )}
                />

                <Route path="*" component={require('../page/NotFoundPage').default} />
            </Switch>
        </Suspense>
    );
}
