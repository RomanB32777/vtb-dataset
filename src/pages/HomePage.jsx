import React, { useState } from 'react';
import { Input, Row, Col, Card, Table, } from 'antd';

import done from '../img/done48.png'
import update from '../img/update.png'
import cancel from '../img/cancel.png'

const { Search } = Input;

export const HomePage = () => {
  const columns = [
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
  ]

  const data = [
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
  ]


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  const onSearch = value => console.log(value);
  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Row style={{ margin: '1rem 0' }}>
        <Col span={6}>
          <Card >
            <img src={done} />
            <p>DataSet status</p>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <img src={update} />
            <p>DataSet status</p>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            {/* <CloseCircleOutlined className="site-result-demo-error-icon" /> */}
            <img src={cancel} />
            <p>DataSet status</p>
          </Card>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}