<template>
  <div>
    <div class="topBar">
      <Icon name="left" @click="goBack" />
      <span>编辑标签</span>
      <Icon />
    </div>
    <div class="content">
      <span>标签名</span>
      <input type="text" placeholder="标签名是?" :value="tag.name" />
    </div>
    <ButtonStyle @click="remove"><slot>删除标签</slot></ButtonStyle>
  </div>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {
  tag?: { id: number; name: string } = undefined;
  created() {
    let id = parseInt(this.$route.params.id);
    let tags = tagListModel.data;
    let tag = tags.filter((tag) => tag.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  goBack() {
    this.$router.back();
  }
  remove() {
    if (this.tag) {
      tagListModel.remove(this.tag.id);
      this.goBack();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.topBar {
  font-family: $font-hei;
  font-size: 20px;
  line-height: 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 16px 16px;
  .icon {
    height: 20px;
    width: 20px;
  }
}
.content {
  font-size: 16px;
  line-height: 16px;
  background: white;
  padding: 12px 16px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  span {
    margin-right: 12px;
  }
  input {
    flex-grow: 1;
    height: 42px;
    border: none;
  }
  input:focus {
    outline: none;
  }
}
</style>