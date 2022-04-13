const localStorageKeyName = "recordList"
const recordListModel = {
    fetch(): RecordItem[] {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
    },
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data))
    }
}

export default recordListModel



