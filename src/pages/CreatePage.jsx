import React, { useState } from 'react';
import { Col, Row, Select } from 'antd';
import { TreeTables } from '../components/TreeTables';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'

const { Option } = Select;



export const CreatePage = observer(() => {


    const children = [];
    // for (let i = 10; i < 36; i++) {
    //     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    // }


    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
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
                    <Select
                        mode="multiple"
                        size='default'
                        placeholder="Please select"
                        // defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        {mainStore.atrrOptions.length && mainStore.atrrOptions.map(option => (
                            <Option key={option.key}>{option.title}</Option>
                        ))}
                        {/* {children} */}
                    </Select>
                </Col>
            </Row>


        </div>
    )
})