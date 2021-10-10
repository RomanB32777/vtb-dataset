import React, { useState } from 'react';
import { Secured } from '../pages/Secured'
import { Route } from "react-router-dom";

import { Layout, Row, Col, Avatar, Popover } from 'antd';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';



import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';


const { Header } = Layout;

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);


export const Navbar = observer(() => {

    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
                <Col span={3}>
                    {React.createElement(mainStore.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => mainStore.setCollapsed(!mainStore.collapsed),
                    })}
                </Col>

                <Col span={3} offset={18}>
                    <Popover content={content} title="Title" trigger="click">
                        <Route path="/" component={Secured} />
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>
                </Col>
            </Row>
        </Header>
    )
})