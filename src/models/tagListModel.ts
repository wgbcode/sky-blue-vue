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
    remove: (id: number) => Boolean
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
    remove(id: number) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break
            }
        }
        this.data.splice(index, 1)
        this.save()
        return true
    },
    save() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }
}
export default tagListModel