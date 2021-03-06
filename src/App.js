import React from 'react';
import { Navbar } from './components/Navbar';
import 'antd/dist/antd.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import { Layout } from 'antd';

import {
  UserOutlined,
} from '@ant-design/icons';

import { HomePage } from './pages/HomePage';
import { Sidebar } from './components/Sidebar';
import { CreatePage } from './pages/CreatePage';
import { AuditPage } from './pages/AuditPage';

const { Content } = Layout;

function App() {
  const routers = [
    {
      path: '/',
      title: 'Главная',
      Component: HomePage,
      icon: UserOutlined // ?
    },
    {
      path: '/create',
      title: 'Создать фичу',
      Component: CreatePage,
      icon: UserOutlined
    },
    {
      path: '/audit',
      title: 'Аудит',
      Component: AuditPage,
      icon: UserOutlined
    },
  ]


  return (
    <div className="App">
      <Layout className="site-layout">
        <Router>
          <Sidebar routers={routers} />
          <Layout className="site-layout">
            <Navbar />

            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                {/* {routers.map(({ path, Component }) => (
                  <Route key={path} exact path={path}>
                    {Component}
                  </Route>
                ))} */}
                <Route exact path="/create">
                  <CreatePage />
                </Route>
                <Route exact path="/audit">
                  <AuditPage />
                </Route>
                <Route exact path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    </div >
  );
}

export default App;
