import React from 'react';
import {Spin} from 'antd';

import styles from './PageLoading.less';

export default function PageLoading() {
    return (
        <div className={styles.loading}>
            <Spin size="large" />
        </div>
    );
}
