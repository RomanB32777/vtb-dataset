import { Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import mainStore from '../../../store/mainStore';

export const CardTitle = observer(({ heading }) => {

    const removeProperty = prop => ({ [prop]: _, ...rest }) => rest

    const removeSelectedTable = (e, table) => {
        e.preventDefault()
        mainStore.setSelectedTables([...mainStore.selectedTables.filter(t => t.key !== table.key)])
        mainStore.setAttrOptions(removeProperty(table.key)(mainStore.atrrOptions))
    }

    return (
        <>
            {heading}
            <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                {!!mainStore.getNamesOfSelectedTables.length && mainStore.getNamesOfSelectedTables.map(table => <Tag
                    onClose={e => removeSelectedTable(e, table)}
                    style={{ marginTop: '0.3rem' }}
                    key={table.key}
                    color="processing"
                    closable
                    >
                    {table.title}
                </Tag>)}
            </div>
        </>
    )
})