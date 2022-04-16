import tagListModel from "@/models/tagListModel"

const tagStore = {
    tagList: tagListModel.fetch(),
    findTag: (id: string) => {
        return tagStore.tagList.filter((tag) => tag.id === id)[0];

    },
    createTag: (name: string | null) => {
        if (name) {
            const message = tagListModel.create(name);
            if (message === "duplicated") {
                alert("标签名重复了");
            } else if (message === "success") {
                alert("添加成功");
            }
        } else {
            alert("请输入标签名")
        }
    },
    removeTag: (tag: tag) => {
        return tagListModel.remove(tag.id)
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name)
    }

}

export default tagStore