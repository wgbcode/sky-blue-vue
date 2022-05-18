import Vue from "vue";
import Component from "vue-class-component";

// 混入，分发 Vue 组件中可复用的功能
@Component
export default class TagHelper extends Vue {
  createTag(tag: Tag) {
    if (tag.name === "") {
      alert("请输入名字");
    } else if (tag.icon === "") {
      alert("请选择图标");
    } else {
      this.$store.commit("createTag", tag);
      this.$router.back();
      this.$store.commit("fetchTags");
    }
  }
}
