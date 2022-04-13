

const recordListModel = {
    fetch(): RecordItem[] {
        return JSON.parse(window.localStorage.getItem("recordList") || "[]")
    },
    save(recordList: RecordItem[]) {
        window.localStorage.setItem('recordList', JSON.stringify(recordList))
    },
    clone(record: RecordItem) {
        return JSON.parse(JSON.stringify(record))
    }
}

export default recordListModel



