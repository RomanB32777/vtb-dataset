import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import 'antd/dist/antd.css';
import './App.css';

import done from './img/done48.png'
import update from './img/update.png'
import cancel from './img/cancel.png'


import { Layout, Menu, Input, Row, Col, Card, Avatar, Table, Popover } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const { Search } = Input;

const { Header, Sider, Content } = Layout;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: 'Список датасетов',
      dataIndex: 'name',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      //   {
      //     text: 'Submenu',
      //     value: 'Submenu',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      // filters: [
      //   {
      //     text: 'Active',
      //     value: 'active',
      //   },
      //   {
      //     text: 'Disactive',
      //     value: 'disactive',
      //   },
      // ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ]);

  const [data, setData] = useState([
    {
      key: '1',
      name: 'Тестовый',
      date: '30.09.2021',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Еще один тест',
      date: '23.09.2021',
      status: 'Disactive',
    },
    {
      key: '3',
      name: 'И еще один тест',
      date: '10.08.2021',
      status: 'Active',
    },
  ])


  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const onSearch = value => console.log(value);

  return (
    <div className="App">
      <Layout className="site-layout">
        <Sider trigger={null} collapsible collapsed={collapsed} className="site-layout-background">
          <div style={{ backgroundSize: collapsed ? "100%" : "55%" }} className="logo" />
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}

              <Col span={3} offset={18}>
                <span style={{ marginRight: '0.5rem'}}> Name </span>
                <Popover content={content} title="Title" trigger="click">
                  <Avatar size="large" icon={<UserOutlined />} />
                </Popover>

              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <Row style={{ margin: '1rem 0' }}>
              <Col span={6}>
                {/* <Card style={{ width: 300, marginTop: 16 }} >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Card> */}

                <Card >
                  <img src={done} />
                  <p>DataState status</p>
                </Card>
              </Col>

              <Col span={6}>
                <Card>
                  <img src={update} />
                  <p>DataState status</p>
                </Card>
              </Col>

              <Col span={6}>
                <Card>
                  {/* <CloseCircleOutlined className="site-result-demo-error-icon" /> */}
                  <img src={cancel} />
                  <p>DataState status</p>
                </Card>
              </Col>
            </Row>
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
