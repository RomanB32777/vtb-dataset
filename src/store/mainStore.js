import { makeAutoObservable } from "mobx"

class MainStore {

    collapsed = false

    constructor() {
        makeAutoObservable(this)
    }

    setCollapsed(collapsed) {
        this.collapsed = collapsed
    }
}

export default new MainStore()