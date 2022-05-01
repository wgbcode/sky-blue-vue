import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone"
import createId from "@/lib/createId"
import router from "@/router"

Vue.use(Vuex)  // 把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    showTagList: [],
    currentTag: undefined,
    selectedType: "-"
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
      let localTagList = JSON.parse(localStorage.getItem('tagList') || "[]")
      if (state.selectedType === "-") {
        if (localTagList.findIndex((t: Tag) => t.type === "-") === -1) {
          state.tagList = [...localTagList, { "id": "1", "name": "餐饮", "icon": 'eat', "type": "-" }, {
            "id": "2", "name": "交通", "icon": "traffic", "type": "-"
          }, { "id": "3", "name": "住房", "icon": "house", "type": "-" }, { "id": "4", "name": "烟酒", "icon": "smoke", "type": "-" }, { "id": "5", "name": "医院", "icon": "hospital", "type": "-" }, { "id": "6", "name": "运动", "icon": "exercise", "type": "-" }, { "id": "7", "name": "旅行", "icon": "travel", "type": "-" }, { "id": "8", "name": "服装", "icon": "cloths", "type": "-" }]
          store.commit('saveTags')
        }
        state.showTagList = state.tagList.filter((t: Tag) => t.type === "-")
      } else {
        if (localTagList.findIndex((t: Tag) => t.type === "+") === -1) {
          state.tagList = [...localTagList, {
            "id": "9", "name": "工资", "icon": "salary", "type": "+"
          }, { "id": "10", "name": "奖金", "icon": "bonus", "type": "+" }, { "id": "11", "name": "兼职", "icon": "part-time-job", "type": "+" }, { "id": "12", "name": "基金", "icon": "fund", "type": "+" }]
          store.commit('saveTags')
        }
        state.showTagList = state.tagList.filter((t: Tag) => t.type === "+")
      }
    },   // 问题待解决：每次切换路由都要调用一次 fetchTags
    findTag: (state, id: string) => {
      return state.tagList.filter((tag) => tag.id === id)[0];
    },
    createTag(state, name: string | null) {
      if (name) {
        const message = ((name: string) => {
          let names = state.tagList.map(tag => tag.name)
          let type = state.selectedType
          if (names.indexOf(name) >= 0) {
            return "duplicated"
          } else {
            let id = createId()
            state.tagList.push({ id, name, type })
            store.commit('saveTags')
            store.commit('fetchTags')
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
          return 'duplicated';
        } else {
          const tag = state.tagList.filter(item => item.id === payload.id)[0];
          tag.name = payload.name;
          store.commit('saveTags')
          return 'success';
        }
      } else {
        return 'not found';
      }
    },
    saveTags(state) {
      localStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
  },
})

export default store;
