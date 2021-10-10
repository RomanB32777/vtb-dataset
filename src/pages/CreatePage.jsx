import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row, Select, Card, Button, Tag, Input } from 'antd';
import { TreeTables } from '../components/TreeTables';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'
import {
    CloseOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

export const CreatePage = observer(() => {

    const parameters = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT']

    const [currentParameter, setCurrentParameter] = useState('')
    const [parameterInput, setParameterInput] = useState('')
    const [request, setRequest] = useState({})
    const [requestText, setRequestText] = useState('')

    const handleChange = (key) => {
        console.log(key);
        // mainStore.setAttrOptions({...mainStore.atrrOptions, [parentKey]})
        // const option = mainStore.getAllSelectedOptions.find(option => option.key === key[0]); // удаляет локально

        // console.log({ ...mainStore.atrrOptions, [parentKey]: mainStore.atrrOptions[parentKey] ? [...mainStore.atrrOptions[parentKey].filter(o => o.key !== key) ] : [info.selectedNodes[0]] });
        // mainStore.setAttrOptions(

        // mainStore.atrrOptions[table.key].map(option => option.key )

        // проверка, на существование опшина (если есть, то удаляем)
    }

    const removeCard = (id) => {
        mainStore.setSelectedTables([...mainStore.selectedTables.filter(table => { console.log(table); return (table.key !== id) })])
    }

    const TagClick = parameter => {
        setCurrentParameter(parameter)
        setParameterInput(`${parameter} `)
    }

    const addParameterInRequest = (parameter) => {
        setRequest({ ...request, [parameter]: parameterInput }) // не укально для таблиц ?????
        setParameterInput(`${parameter} `)
    }

    const sendJSON = ({ key, title }) => {

        const arr = mainStore.atrrOptions[key].reduce((arr, option) => {
            // console.log("title", option.title);
            const table = JSON.data.search.searchResults.filter(table => table.entity.name === title) // !!!!
            const fields = table[0].entity.schemaMetadata.fields.filter(field => field.fieldPath === option.title)
            arr[option.title] = { ...fields[0], parent: title }
            return arr
        }, [])


        const obj = {
            parameters: { ...request },
            attributes: arr,
            request: requestText
        }

        console.log(obj);
        // const json = JSON.stringify(obj);
        // console.log(JSON.stringify(obj) );
    }

    useEffect(() => {
        request && setRequestText(Object.keys(request).reduce((str, curr) => str + request[curr] + '\n', ''))
    }, [request])

    return (
        <div>
            <Row>
                <Col span={6}>
                    <TreeTables />
                </Col>

                <Col span={18}>
                    {!!mainStore.selectedTables.length ? mainStore.selectedTables.map((table, i) => {
                        return (
                            <Card className="table-card" style={{ marginTop: i !== 0 ? '1rem' : '0' }} key={table.key} title={`Конструктор запросов`} >
                                {/* extra={<CloseOutlined onClick={() => removeCard(table.key)} />} */}
                                <div style={{ marginBottom: '1rem' }}>
                                    {!!parameters.length && parameters.map((p, i) => <Tag  style={{ marginTop: '0.3rem' }} key={i} onClick={() => TagClick(p)} color="processing">{p}</Tag>)}
                                </div>
                                <Card style={{ marginBottom: '1rem' }} type="inner" title={`Атрибуты таблиц`} >
                                    <Select
                                        mode="multiple"
                                        size='default'
                                        placeholder="Please select"
                                        onChange={selected => handleChange(selected)}
                                        style={{ width: '100%' }}
                                        value={mainStore.getAllSelectedOptions && mainStore.getAllSelectedOptions.map(option => option.key)}
                                    >
                                        {/* {mainStore.atrrOptions && Object.keys(mainStore.atrrOptions).map(table => console.log(mainStore.atrrOptions[table]))} */}
                                        {/* {mainStore.atrrOptions[table.key] && mainStore.atrrOptions[table.key].map(option => ( */}
                                        {mainStore.getAllSelectedOptions && mainStore.getAllSelectedOptions.map(option => (
                                            <Option key={option.key}>{option.title}</Option>
                                        ))}
                                    </Select>
                                </Card>
                                {currentParameter !== "" &&
                                    <Card type="inner" title={`Заполните параметр ${currentParameter}`}>
                                        <Input onChange={({ target }) => setParameterInput(target.value)} value={parameterInput} placeholder={`${currentParameter} ...`} />
                                        <Button onClick={() => addParameterInRequest(currentParameter)} style={{ marginTop: '1rem' }} type="primary">Готово</Button>
                                    </Card>
                                }
                                <TextArea value={requestText} disabled style={{ marginTop: '1rem' }} rows={4} placeholder="Результат" />
                                <Button onClick={() => sendJSON(table)} style={{ marginTop: '1rem' }} type="primary">Создать задание</Button>
                            </Card>
                        )
                    })
                        :
                        (<Card style={{ marginTop: '1rem' }} title={`Конструктор запросов`} >
                            <p>Выберите таблицы и атрибуты слева для создания запроса.</p>
                        </Card>)
                    }

                </Col>
            </Row>


        </div>
    )
})