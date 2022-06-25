import React, { useState } from 'react';
import { Layout, Button, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';

import style from './sider.module.css';


const { Sider } = Layout;



const SiderLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className={style.container}>
            <Sider className={style.sider} trigger={null} collapsible collapsed={collapsed}>
                <div className={style.trigger}>
                <Icon component={collapsed ? triggerClose : triggerOpen} onClick={() => setCollapsed(!collapsed)} />
                </div>
                <Menu className={style.menu}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
        </div>
    );
}

export default SiderLayout;

const triggerOpen = () => (
    <svg width="3em"
        height="3em"
        viewBox="0 0 30 30"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.3" x="5.3335" y="6.66602" width="13.33" height="2.66667" rx="1.33333" fill="currentColor" />
        <rect opacity="0.3" x="5.3335" y="17.334" width="13.33" height="2.66667" rx="1.33333" fill="currentColor" />
        <path d="M6.66683 12C5.93045 12 5.3335 12.597 5.3335 13.3333C5.3335 14.0697 5.93045 14.6667 6.66683 14.6667H25.3302C26.0665 14.6667 26.6635 14.0697 26.6635 13.3333C26.6635 12.597 26.0665 12 25.3302 12H6.66683ZM6.66683 22.666C5.93045 22.666 5.3335 23.263 5.3335 23.9994C5.3335 24.7357 5.93045 25.3327 6.66683 25.3327H25.3302C26.0665 25.3327 26.6635 24.7357 26.6635 23.9994C26.6635 23.263 26.0665 22.666 25.3302 22.666H6.66683Z" fill="currentColor" />
    </svg>

)


const triggerClose = () => (
    <svg width="3em"
        height="3em"
        viewBox="0 0 30 30"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.3" x="5.3335" y="6.66602" width="21.3333" height="2.66667" rx="1.33333" fill="currentColor" />
        <rect opacity="0.3" x="5.3335" y="17.334" width="21.3333" height="2.66667" rx="1.33333" fill="currentColor" />
        <path d="M6.66683 12C5.93045 12 5.3335 12.597 5.3335 13.3333C5.3335 14.0697 5.93045 14.6667 6.66683 14.6667H17.3335C18.0699 14.6667 18.6668 14.0697 18.6668 13.3333C18.6668 12.597 18.0699 12 17.3335 12H6.66683ZM6.66683 22.6667C5.93045 22.6667 5.3335 23.2636 5.3335 24C5.3335 24.7364 5.93045 25.3333 6.66683 25.3333H17.3335C18.0699 25.3333 18.6668 24.7364 18.6668 24C18.6668 23.2636 18.0699 22.6667 17.3335 22.6667H6.66683Z" fill="currentColor" />
    </svg>
)