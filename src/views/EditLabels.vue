<template>
  <div>
    <div class="topBar">
      <Icon name="left" @click="goBack" />
      <span>编辑标签</span>
      <Icon />
    </div>
    <div class="form-wrapper">
      <FormItem
        field-name="标签名"
        placeholder="请输入标签名"
        :value="tag.name"
        @update:value="update"
      />
    </div>
    <ButtonStyle @click="remove"><slot>删除标签</slot></ButtonStyle>
  </div>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {
  tag?: { id: string; name: string } = undefined;
  created() {
    let id = this.$route.params.id;
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
  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
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
.form-wrapper {
  background: white;
  margin-top: 8px;
}
</style>