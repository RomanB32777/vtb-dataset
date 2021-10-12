import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Card, Button, Tag, Input } from 'antd';
import { TreeTables } from '../components/TreeTables';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import json from '../back.json'
import { CardTitle } from '../components/UI/Card/CardTitle';
import ReactJson from 'react-json-view'

const { TextArea } = Input;

export const CreatePage = observer(() => {

    const [currentParameter, setCurrentParameter] = useState('')
    const [parameterInput, setParameterInput] = useState('')
    const [requestText, setRequestText] = useState('')
    const [request, setRequest] = useState({})
    const [selectedOptions, setSelectedOptions] = useState([])
    const [finalJSON, setFinalJSON] = useState("")

    const TagClick = parameter => {
        setCurrentParameter(parameter)
        setParameterInput(`${parameter} `)
    }

    const addParameterInRequest = (parameter) => {
        setRequest({ ...request, [parameter]: parameterInput })
        setParameterInput(`${parameter} `)
    }

    const sendJSON = () => {
        const arrAttributes = selectedOptions.reduce((arr, option) => {
            const table = json.data.search.searchResults.find(table => table.entity.name === option.parentName)
            const fields = table.entity.schemaMetadata.fields.find(field => field.fieldPath === option.title)
            arr[option.title] = { ...fields } //, parent: title ??
            return arr
        }, {})


        const obj = {
            parameters: { ...request },
            attributes: arrAttributes,
            request: requestText
        }

        setRequestText("")
        setFinalJSON(obj)
        // console.log(requestText, obj.request, JSON.stringify(obj));

        // const json = JSON.stringify(obj);
        // console.log(JSON.stringify(obj) );
    }

    useEffect(() => {
        request && setRequestText(Object.keys(request).reduce((str, curr) => str + request[curr] + '\n', ''))
    }, [request])

    useEffect(() => {
        if (mainStore.getAllSelectedOptions.length) {
            (selectedOptions.length < mainStore.getAllSelectedOptions.length) ?
                setSelectedOptions([...selectedOptions, mainStore.getAllSelectedOptions[mainStore.getAllSelectedOptions.length - 1]]) // добавление таблицы
                :
                setSelectedOptions([...selectedOptions.filter(option => mainStore.getAllSelectedOptions.includes(option))]) // удалние таблицы
        }
    }, [mainStore.getAllSelectedOptions])

    return (
        <div>
            <Row>
                <Col span={5}>
                    <Card className="table-card" title="Список Data Sets" style={{ marginRight: '1rem' }} >
                        <TreeTables />
                    </Card>
                </Col>
                <Col span={10}>
                    {!!mainStore.selectedTables.length ?
                        (
                            <Card className="table-card" title={`Конструктор запросов`} >
                                <div style={{ marginBottom: '1rem' }}>
                                    {!!mainStore.parameters.length && mainStore.parameters.map((p, i) => <Tag style={{ marginTop: '0.3rem', cursor: 'pointer' }} key={i} onClick={() => TagClick(p)} color="processing">{p}</Tag>)}
                                </div>
                                <Card style={{ marginBottom: '1rem' }} title={<CardTitle heading={"Атрибуты таблиц"} />} type="inner">
                                    <Select
                                        mode="multiple"
                                        size='default'
                                        placeholder="Please select"
                                        style={{ width: '100%' }}
                                        onDeselect={deselected => setSelectedOptions(selectedOptions.filter(o => o.key !== deselected))}
                                        onSelect={key => setSelectedOptions([...selectedOptions, mainStore.getAllSelectedOptions.find(o => o.key === key)])}
                                        value={selectedOptions.map(option => option.key)}
                                        options={mainStore.getAllSelectedOptions && mainStore.getAllSelectedOptions.map(option => ({ value: option.key, label: `${option.title} (${option.parentName})` }))} // , parent: option.parent
                                    />
                                </Card>
                                {currentParameter !== "" &&
                                    <Card type="inner" title={`Заполните параметр ${currentParameter}`}>
                                        <Input onChange={({ target }) => setParameterInput(target.value)} value={parameterInput} placeholder={`${currentParameter} ...`} />
                                        <Button onClick={() => addParameterInRequest(currentParameter)} style={{ marginTop: '1rem' }} type="primary">Готово</Button>
                                    </Card>
                                }
                                <TextArea value={requestText} disabled style={{ marginTop: '1rem' }} rows={4} placeholder="Результат" />
                                <Button onClick={sendJSON} style={{ marginTop: '1rem' }} type="primary">Создать задание</Button>
                            </Card>
                        )
                        :
                        (<Card title={`Конструктор запросов`} >
                            <p>Выберите таблицы и атрибуты слева для создания запроса.</p>
                        </Card>)
                    }
                </Col>
                <Col style={{ marginLeft: '1rem' }} span={8}>
                    <Card title="Сформированный запрос" >
                        {finalJSON &&
                            <ReactJson
                                name={false}
                                displayObjectSize={false}
                                displayDataTypes={false}
                                enableClipboard={false}
                                src={finalJSON}
                            // theme="monokai" 
                            />
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
})



{/* {mainStore.atrrOptions && Object.keys(mainStore.atrrOptions).map(table => console.log(mainStore.atrrOptions[table]))} */ }
{/* {mainStore.atrrOptions[table.key] && mainStore.atrrOptions[table.key].map(option => ( */ }
