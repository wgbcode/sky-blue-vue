import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import defaultTag from "@/constants/defaultTag";
import iconNameList from "@/constants/iconNameList";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    showTagList: [],
    currentTag: undefined,
    selectedType: "",
    iconNameList: [...iconNameList],
    selectedTagName: [],
  } as RootState,

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      );
    },
    createRecord(state, record) {
      state.recordList.push(clone(record));
      console.log(state.recordList);

      store.commit("saveRecord");
    },
    saveRecord(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },

    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    showTags(state) {
      let currentLocalTagList = JSON.parse(localStorage.getItem("tagList")!);
      store.commit("fetchSelectedType");
      state.showTagList = currentLocalTagList.filter(
        (t: Tag) => t.type === state.selectedType
      );
    },
    fetchTags(state) {
      let localTagList = JSON.parse(localStorage.getItem("tagList") || "[]");
      if (localTagList.length === 0) {
        state.tagList = defaultTag;
        store.commit("saveTags");
      }
      store.commit("showTags");
    },
    findTag: (state, id: string) => {
      return state.tagList.filter((tag) => tag.id === id)[0];
    },
    createTag(state, tag) {
      if (tag.name) {
        const message = (() => {
          let names = state.tagList.map((tag) => tag.name);
          if (names.indexOf(tag.name) >= 0) {
            return "duplicated";
          } else {
            let id = createId();
            let type = state.selectedType;
            state.tagList.push({ id, name: tag.name, icon: tag.icon, type });
            store.commit("saveTags");
            return "success";
          }
        })();
        if (message === "duplicated") {
          alert("标签名重复了");
        } else if (message === "success") {
          alert("添加成功");
        }
      } else {
        alert("标签名不能为空");
      }
    },
    removeTag(state, tag: Tag) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === tag.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
    updateTag(state, payload: Tag) {
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(payload.id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(payload.name) >= 0) {
          return "duplicated";
        } else {
          const tag = state.tagList.filter((item) => item.id === payload.id)[0];
          tag.name = payload.name;
          store.commit("saveTags");
          return "success";
        }
      } else {
        return "not found";
      }
    },
    saveTags(state) {
      localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    fetchSelectedType(state) {
      state.selectedType = localStorage.getItem("selectedType") || "-";
      return state.selectedType;
    },
  },
});

export default store;
