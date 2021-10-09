import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import mainStore from '../store/mainStore';
import { observer } from 'mobx-react-lite';
import JSON from '../back.json'

export const TreeTables = observer(() => {

    const [treeDataBack, setTreeDataBack] = useState([])

    useEffect(() => {
        setTreeDataBack([JSON.data.search.searchResults.map(({ entity }, i) => ({
            title: entity.name,
            key: `${i}-0`,
            children: entity.schemaMetadata.fields.map((f, ii) => ({
                title: f.fieldPath,
                key: `${i}-${ii + 1}`
            }))
        })
        )])
    }, [])


    const onSelect = (selectedKeys, info) => {
        if (!info.selectedNodes[0].hasOwnProperty('children'))
            mainStore.setAttrOptions([...mainStore.atrrOptions, info.selectedNodes[0]])
    };

    return (
        <div>
            <Tree
                showLine={true}
                showIcon={false}
                defaultExpandedKeys={['0-0']}
                onSelect={onSelect}
                treeData={treeDataBack[0]}
            />
        </div>
    )
})