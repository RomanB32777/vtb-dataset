import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'

export const TreeTables = observer(() => {

    const [treeDataBack, setTreeDataBack] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([])

    useEffect(() => {
        setTreeDataBack([...JSON.data.search.searchResults.map(({ entity }, i) => ({
            title: entity.name,
            key: `${i}-0`,
            children: entity.schemaMetadata.fields.map((f, ii) => ({
                title: f.fieldPath,
                key: `${i}-${ii + 1}`,
                disabled: true,
                parent: `${i}-0`,
                parentName: entity.name
            }))
        })
        )])
    }, [])


    useEffect(() => {
        treeDataBack.length && setTreeDataBack([...treeDataBack.map(table => {
            return {
                ...table,
                disabled: !!mainStore.selectedTables.find(t => t.key === table.key),
                children: [
                    ...table.children.map(option => ({
                        ...option, disabled: !!!mainStore.selectedTables.find(table => table.key === option.parent)
                    }))
                ]
            }
        }
        )])
    }, [mainStore.selectedTables])

    useEffect(() => {
        mainStore.getAllSelectedOptions.length && setTreeDataBack([...treeDataBack.map(table => {
            return {
                ...table, children: [
                    ...table.children.map(option => {
                        return ({
                            ...option, disabled: !!mainStore.getAllSelectedOptions.find(o => o.key === option.key)
                        })
                    })
                ]
            }
        })]);
    }, [mainStore.getAllSelectedOptions])


    const onSelect = (selectedKeys, info) => {
        if (info.selectedNodes[0] && !info.selectedNodes[0].hasOwnProperty('children')) {
            if (mainStore.selectedTables.find(table => table.key === info.selectedNodes[0].parent)) {
                if (!mainStore.atrrOptions[info.selectedNodes[0].parent]) {
                    mainStore.setAttrOptions({ ...mainStore.atrrOptions, [info.selectedNodes[0].parent]: [info.selectedNodes[0]] })
                    return;
                }

                if (mainStore.atrrOptions[info.selectedNodes[0].parent]) {
                    const selectedOption = mainStore.atrrOptions[info.selectedNodes[0].parent].find(option => option.key === info.selectedNodes[0].key)
                    !selectedOption && mainStore.setAttrOptions({ ...mainStore.atrrOptions, [info.selectedNodes[0].parent]: [...mainStore.atrrOptions[info.selectedNodes[0].parent], info.selectedNodes[0]] })
                }
            }
            else {
                console.log('no table');
            }
        }
        else {
            if (info.selectedNodes[0]) {
                setExpandedKeys([...expandedKeys, ...selectedKeys])
                const selectedTable = mainStore.selectedTables.find(table => table.key === info.selectedNodes[0].key)
                !selectedTable && mainStore.setSelectedTables([...mainStore.selectedTables, info.selectedNodes[0]]) // добавление таблицы при условии, что она еще не была до этого выбрана
            }
        }
    }


    return (
        <div>
            {/* сделать неактивными уже выбранные таблицы и аттрибуты в сторе get функцию создать */}
            <Tree
                showLine={true}
                showIcon={false}
                defaultExpandedKeys={['0-0']}
                onSelect={onSelect}
                expandedKeys={expandedKeys}
                autoExpandParent={true}
                treeData={treeDataBack}
                onExpand={(expandedKeys) => setExpandedKeys(expandedKeys)}
            />
        </div>
    )
})