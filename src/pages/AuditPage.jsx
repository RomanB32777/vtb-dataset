import React from 'react';
import { Col, List, Row, Tag, Card, Button, Popover } from 'antd';

const data = [
    {
        id: 0,
        name: 'dataset name',
        owner: 'User',
        value: 1024,
        resources: 'resources',
        lastUpd: 'data last_upd',
        fields: [
            'field1', 'field2', 'field3'
        ]
    },
    {
        id: 1,
        name: 'dataset name 1',
        owner: 'User',
        value: 1024,
        resources: 'resources',
        lastUpd: 'data last_upd',
        fields: [
            'field1', 'field2', 'field3'
        ]
    },
    {
        id: 2,
        name: 'dataset name 2',
        owner: 'User',
        value: 1024,
        resources: 'resources',
        lastUpd: 'data last_upd',
        fields: [
            'field1', 'field2', 'field3'
        ]
    },
    {
        id: 3,
        name: 'dataset name 3',
        owner: 'User',
        value: 1024,
        resources: 'resources',
        lastUpd: 'data last_upd',
        fields: [
            'field1', 'field2', 'field3'
        ]
    },

];

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
    </div>
);

const content1 = (
    <div>
        <p>Role</p>
        <p>Role</p>
    </div>
);


export const AuditPage = () => {
    return (
        <div>

            <Card
                style={{ marginBottom: 16 }}
                type="inner"
            // title="Inner Card title"
            // extra={<a href="#">More</a>}
            >
                <Row style={{ width: '100%' }}>
                    <Col span={5}>
                        UserName
                    </Col>
                    <Col span={5}>
                        <Popover placement="bottom" content={content1} trigger="click">
                            Roles
                        </Popover>
                    </Col>
                    <Col span={5}>
                        Status: <span style={{ color: 'green' }}>Active</span>
                    </Col>
                    <Col span={5}>
                        <Popover placement="bottom" content={content} trigger="click">
                            Available DataSets
                        </Popover>
                    </Col>
                    <Col span={4}>
                        <Button type="primary">Block All</Button>
                    </Col>
                </Row>

            </Card>
            <List
                size="large"
                header={<div>Доступные DataSets</div>}
                bordered
                dataSource={data}
                renderItem={item =>
                    <List.Item>
                        <Row style={{ width: '100%' }}>
                            {Object.keys(item).map((fieldName, key) => {
                                if (!Array.isArray(item[fieldName]) && fieldName !== 'id')
                                    return (
                                        <Col key={key} span={4}>
                                            {item[fieldName]}
                                        </Col>
                                    )
                                else if (Array.isArray(item[fieldName]))
                                    return (
                                        <Col style={{ marginTop: '1rem' }} key={key} span={24}>
                                            <span>Поля: </span>{item.fields && item.fields.map((f, i) => (<Tag key={i} color="processing">{f}</Tag>))}
                                        </Col>
                                    )
                            })}
                        </Row>

                    </List.Item>
                }
            />
        </div>
    )
}