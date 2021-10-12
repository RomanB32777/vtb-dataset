import { makeAutoObservable } from "mobx"
import JSON from '../back.json'

class MainStore {

    collapsed = false
    atrrOptions = {}
    selectedTables = []
    parameters = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT']
    dataSets = [JSON.data.search.searchResults.map(({ entity }, i) => ({
        title: entity.name,
        key: `${i}-0`,
        children: entity.schemaMetadata.fields.map((f, ii) => ({
            title: f.fieldPath,
            key: `${i}-${ii + 1}`,
            parent: `${i}-0`,
            parentName: entity.name
        }))
    })
    )]

    constructor() {
        makeAutoObservable(this)
    }

    setCollapsed(collapsed) {
        this.collapsed = collapsed
    }

    setAttrOptions(options) {
        this.atrrOptions = options
    }

    setSelectedTables(tables) {
        this.selectedTables = tables
    }

    includeSelectedTable() {

    }

    get getNamesOfSelectedTables() {
        return this.selectedTables.map(table => ({ title: table.title, key: table.key }))
    }

    get getAllSelectedOptions() {
        // console.log(this.atrrOptions);
        return Object.keys(this.atrrOptions).reduce((arr, curr) => {
            this.atrrOptions[curr].forEach(i => arr.push(i)) // ?????? 
            return arr
        }, [])
    }

    includeSelectedOption(option) {
        console.log(this.getAllSelectedOptions);
        // console.log(this.getAllSelectedOptions);
    }
}

export default new MainStore()