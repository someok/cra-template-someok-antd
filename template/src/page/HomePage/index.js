import React from 'react';
import {formatLong} from '@/util/dateUtils';
import useTitle from '@/hook/useTitle';

export default function HomePage() {
    useTitle('Home');

    return <div>This is homepage @{formatLong(Date.now())}</div>;
}
