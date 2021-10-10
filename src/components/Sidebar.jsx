import React from 'react';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';

import { Layout, Menu } from 'antd';
import { NavLink } from "react-router-dom";

import {
    UserOutlined,
  } from '@ant-design/icons';


const { Sider } = Layout;


export const Sidebar = observer(({ routers }) => {

    return (
        <Sider trigger={null} collapsible collapsed={mainStore.collapsed} className="site-layout-background">
            <div style={{ backgroundSize: mainStore.collapsed ? "100%" : "55%" }} className="logo" />
            <Menu mode="inline" defaultSelectedKeys={['1']}>
                {routers.map(({title, path, icon}, key) => (
                    <Menu.Item key={key} icon={<UserOutlined />}>  {/* icon={<UserOutlined />} */}
                        <NavLink to={path}>{title}</NavLink>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    )
})