import React from 'react';
import {formatLong} from '@/util/dateUtils';
import useTitle from '@/hook/useTitle';

import './styles.less';
import styles from './styles.module.less';

export default function DemoPage() {
    useTitle('Demo');

    return (
        <div className={styles.demoWrapper}>
            This is demo page @<span className="demo-test">{formatLong(Date.now())}</span>
        </div>
    );
}
