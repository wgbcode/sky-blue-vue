import tagListModel from "@/models/tagListModel"
import recordListModel from '@/models/recordListModel'

const store2 = {
    // record store2
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => { recordListModel.create(record) },

    // tag store2
    tagList: tagListModel.fetch(),
    findTag: (id: string) => {
        return store2.tagList.filter((tag) => tag.id === id)[0];

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

export default store2