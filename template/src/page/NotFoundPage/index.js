import React from 'react';
import {Result, Button} from 'antd';
import {useHistory} from 'react-router-dom';

import useTitle from '@/hook/useTitle';

export default function NotFoundPage() {
    useTitle('404');
    const history = useHistory();

    return (
        <Result
            status="404"
            style={{marginTop: 200, backgroundColor: 'transparent'}}
            title="404"
            subTitle="此页面不存在"
            extra={
                <Button type="primary" onClick={() => history.replace('/')}>
                    返回首页
                </Button>
            }
        />
    );
}
