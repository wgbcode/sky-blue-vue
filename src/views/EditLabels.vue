<template>
  <div class="wrapper">
    <div class="topBar">
      <Icon name="left" @click="goBack" />
      <span>编辑标签</span>
      <Icon />
    </div>
    <FormItem
      field-name="标签名"
      placeholder="请输入标签名"
      :value="currentTag.name"
      @update:value="update"
      classPrefix="edit"
    />
    <ButtonStyle @click="remove"><slot>删除标签</slot></ButtonStyle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("setCurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  goBack() {
    this.$router.back();
  }
  update(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", {
        id: this.currentTag.id,
        name,
      });
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.wrapper {
  background: white;
  height: 100vh;
  color: white;
  .topBar {
    font-family: $font-hei;
    font-size: 20px;
    line-height: 16px;
    background: #49ad95;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
    .icon {
      height: 20px;
      width: 20px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }
}
::v-deep .edit-textInputWrapper {
  background: white;
  border-bottom: 1px solid rgb(242, 232, 232);
  width: 100%;
  padding: 12px 0 0 0;
  color: black;
  margin: 12px;
  font-family: $font-hei;
  .edit-textName {
    padding: 0px 16px 0 4px;
  }
}
</style>