import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'

export const TreeTables = observer(() => {

    const [treeDataBack, setTreeDataBack] = useState([])
    const [expandedKeys, setExpandedKeys] = useState([])

    useEffect(() => {
        setTreeDataBack([JSON.data.search.searchResults.map(({ entity }, i) => ({
            title: entity.name,
            key: `${i}-0`,
            children: entity.schemaMetadata.fields.map((f, ii) => ({
                title: f.fieldPath,
                key: `${i}-${ii + 1}`,
                parent: `${i}-0`,
                parentName: entity.name
            }))
        })
        )])
    }, [])


    const onSelect = (selectedKeys, info) => {
        // console.log(selectedKeys, info);
        // console.log(info.selectedNodes[0]);
        if (info.selectedNodes[0] && !info.selectedNodes[0].hasOwnProperty('children')) {
            if (!mainStore.atrrOptions[info.selectedNodes[0].parent]) {
                mainStore.setAttrOptions({ ...mainStore.atrrOptions, [info.selectedNodes[0].parent]: [info.selectedNodes[0]] })
                return;
            }

            if (mainStore.atrrOptions[info.selectedNodes[0].parent]){
                const selectedOption = mainStore.atrrOptions[info.selectedNodes[0].parent].find(option => option.key === info.selectedNodes[0].key)
                !selectedOption && mainStore.setAttrOptions({ ...mainStore.atrrOptions, [info.selectedNodes[0].parent]: [...mainStore.atrrOptions[info.selectedNodes[0].parent], info.selectedNodes[0]] })
            }
        }
        else {
            if (info.selectedNodes[0]) {
                setExpandedKeys([...expandedKeys, ...selectedKeys])
                const selectedTable = mainStore.selectedTables.find(table => table.key === info.selectedNodes[0].key)
                !selectedTable && mainStore.setSelectedTables([...mainStore.selectedTables, info.selectedNodes[0]])
            }
        }
    }

    return (
        <div>


            <Tree
                showLine={true}
                showIcon={false}
                defaultExpandedKeys={['0-0']}
                onSelect={onSelect}
                expandedKeys={expandedKeys}
                autoExpandParent={true}
                treeData={treeDataBack[0]}
                onExpand={(expandedKeys) => setExpandedKeys(expandedKeys)}
            />
        </div>
    )
})