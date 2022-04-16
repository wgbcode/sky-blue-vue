import clone from "@/lib/clone"

const localStorageKeyName = "recordList"
const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecord(): RecordItem[] {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
        return this.recordList
    },
    createRecord(data: RecordItem) {
        this.recordList.push(clone(data))
        this.saveRecord()
    },
    saveRecord() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
    },

}

export default recordStore