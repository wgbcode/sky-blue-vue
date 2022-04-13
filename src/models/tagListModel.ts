import createId from "@/lib/createId"

const localStorageKeyName = 'tagList'

type tag = {
    id: number,
    name: string
}
type TagListModel = {
    data: tag[],
    fetch: () => tag[],
    create: (name: string) => "duplicated" | 'success'
    save: () => void
}
const tagListModel: TagListModel = {
    data: [],
    fetch() { return JSON.parse(localStorage.getItem(localStorageKeyName) || "[]") },
    create(name: string) {
        let names = this.data.map(tag => tag.name)
        if (names.indexOf(name) >= 0) {
            return "duplicated"
        } else {
            let id = createId()
            this.data.push({ id, name })
            this.save()
            return 'success'
        }
    },
    save() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }
}
export default tagListModel