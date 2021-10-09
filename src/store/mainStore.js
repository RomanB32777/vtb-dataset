import { makeAutoObservable } from "mobx"

class MainStore {

    collapsed = false
    atrrOptions = []

    constructor() {
        makeAutoObservable(this)
    }

    setCollapsed(collapsed) {
        this.collapsed = collapsed
    }

    setAttrOptions(options) {
        this.atrrOptions = options
        console.log(this.atrrOptions, options);
    }
}

export default new MainStore()