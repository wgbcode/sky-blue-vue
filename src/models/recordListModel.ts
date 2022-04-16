import clone from "@/lib/clone"

const localStorageKeyName = "recordList"
const recordListModel = {
    data: [] as RecordItem[],
    fetch(): RecordItem[] {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
        return this.data
    },
    create(data: RecordItem) {
        this.data.push(clone(data))
        this.save()
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    },

}

export default recordListModel



