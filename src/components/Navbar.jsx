import React, { useState } from 'react';
// import {
    // AppstoreOutlined,

    // PieChartOutlined,
    // DesktopOutlined,
    // ContainerOutlined,
//     // MailOutlined,
// } from '@ant-design/icons';

import { Layout, Menu, Row, Col, Avatar, Popover } from 'antd';
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
                {React.createElement(mainStore.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => mainStore.setCollapsed(!mainStore.collapsed),
                })}

                <Col span={3} offset={18}>
                    <span style={{ marginRight: '0.5rem' }}> Name </span>
                    <Popover content={content} title="Title" trigger="click">
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>

                </Col>
            </Row>
        </Header>
    )
})