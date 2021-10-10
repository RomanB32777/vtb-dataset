import { makeAutoObservable } from "mobx"

class MainStore {

    collapsed = false
    atrrOptions = {}
    selectedTables = []

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

    get getNamesOfSelectedTables() {
        return this.selectedTables.map(table => table.title)
    }

    get getAllSelectedOptions() {
        // console.log(this.atrrOptions);

        return Object.keys(this.atrrOptions).reduce((arr, curr) => {
            this.atrrOptions[curr].forEach(i => arr.push(i)) // ?????? 
            return arr
        }, [])
    }
}

export default new MainStore()