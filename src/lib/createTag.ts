import tagListModel from "@/models/tagListModel"

function createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
        let message = tagListModel.create(name);
        if (message === "duplicated") {
            alert("输入的标签重复了");
        } else if (message === "success") {
            alert("添加成功");
        }
    }
}

export default createTag