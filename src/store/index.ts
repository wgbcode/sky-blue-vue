import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from "@/lib/createId"
import router from "@/router"


Vue.use(Vuex)  // 把 store 绑到 Vue.prototype.$store = store

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: { // methods
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]")
    },
    createRecord(state, record) {
      state.recordList.push(clone(record))
      store.commit("saveRecord")
    },
    saveRecord(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList))
    },


    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem('tagList') || "[]")
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = [{ "id": "1", "name": "衣" }, { "id": "2", "name": "食" }, { "id": "3", "name": "住" }, { "id": "4", "name": "行" }]
      }
    },
    findTag: (state, id: string) => {
      return state.tagList.filter((tag) => tag.id === id)[0];

    },
    createTag(state, name: string | null) {
      if (name) {
        const message = ((name: string) => {
          let names = state.tagList.map(tag => tag.name)
          if (names.indexOf(name) >= 0) {
            return "duplicated"
          } else {
            let id = createId()
            state.tagList.push({ id, name })
            store.commit('saveTags')
            return 'success'
          }
        })(name)
        if (message === "duplicated") {
          alert("标签名重复了");
        } else if (message === "success") {
          alert("添加成功");
        }
      } else {
        alert("标签名不能为空")
      }
    },
    removeTag(state, tag: Tag) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === tag.id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
    updateTag(state, payload: Tag) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(payload.id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(payload.name) >= 0) {
          return 'duplicated';  // ?
        } else {
          const tag = state.tagList.filter(item => item.id === payload.id)[0];
          tag.name = payload.name;
          store.commit('saveTags')
          return 'success';  // ?
        }
      } else {
        return 'not found';  // ?
      }
    },
    saveTags(state) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
  },
})

export default store;
