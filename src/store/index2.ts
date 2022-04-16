import tagStore from "./tagStore"
import recordStore from "./recordStroe"

const store2 = {
    ...tagStore,
    ...recordStore
}

export default store2