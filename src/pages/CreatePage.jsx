import React, { useState } from 'react';
import { Col, Row, Select, Card, Button, Tag } from 'antd';
import { TreeTables } from '../components/TreeTables';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'

const { Option } = Select;

export const CreatePage = observer(() => {

    const handleChange = (value) => {
        // console.log(`Selected: ${value}`);
    }

    return (
        <div>
            <Row>
                <Col span={4}>
                    <TreeTables />
                </Col>
                <Col span={10}>
                </Col>
                <Col span={10}>
                    {!!mainStore.selectedTables.length && mainStore.selectedTables.map((table, i) => {
                        return (
                            <Card style={{ marginTop: i !== 0 ? '1rem' : '0' }} key={table.key} title={`Конструктор запросов`}>
                                <div style={{ marginBottom: '1rem' }}> 
                                    <Tag color="processing">select</Tag>
                                    <Tag color="processing">join</Tag>

                                </div>
                                <Card type="inner" title={`Атрибуты таблицы ${table.title}`} >
                                    <Select
                                        mode="multiple"
                                        size='default'
                                        placeholder="Please select"
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    >
                                        {mainStore.atrrOptions[table.key] && mainStore.atrrOptions[table.key].map(option => (
                                            <Option key={option.key}>{option.title}</Option>
                                        ))}
                                    </Select>
                                </Card>
                                <Button style={{ marginTop: '1rem' }} type="primary">Создать задание</Button>
                            </Card>
                        )
                    })}

                </Col>
            </Row>


        </div>
    )
})