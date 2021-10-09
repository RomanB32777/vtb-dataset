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
}

export default new MainStore()