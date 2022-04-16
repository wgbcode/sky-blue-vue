import createId from "@/lib/createId"

const localStorageKeyName = 'tagList'
const tagStore = {
    tagList: [] as tag[],
    fetch() {
        this.tagList = JSON.parse(localStorage.getItem(localStorageKeyName) || "[]")
        return this.tagList
    },
    findTag: (id: string) => {
        return tagStore.tagList.filter((tag) => tag.id === id)[0];

    },
    createTag(name: string | null) {
        if (name) {
            const message = ((name: string) => {
                let names = this.tagList.map(tag => tag.name)
                if (names.indexOf(name) >= 0) {
                    return "duplicated"
                } else {
                    let id = createId()
                    this.tagList.push({ id, name })
                    this.saveTag()
                    return 'success'
                }
            })(name)
            if (message === "duplicated") {
                alert("标签名重复了");
            } else if (message === "success") {
                alert("添加成功");
            }
        } else {
            alert("请输入标签名")
        }
    },
    removeTag(tag: tag) {
        let index = -1
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === tag.id) {
                index = i
                break
            }
        }
        this.tagList.splice(index, 1)
        this.saveTag()
        return true
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTag();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    saveTag() {
        localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList))
    }

}

export default tagStore