<template>
  <div class="wrapper">
    <div class="topBar">
      <Icon name="left" class="back" @click="goBack" />
      <div class="wrapperIcon">
        <Icon :name="currentTag.icon" />
      </div>
      <span class="tagName">{{ currentTag.name }}</span>
    </div>
    <FormItem
      field-name="标签名"
      placeholder="请输入新标签名"
      :value.sync="value"
      classPrefix="edit"
    />
    <ol class="wrapperOprate">
      <li class="oprate">
        <button @click="remove" class="remove">删除</button>
        <button @click="update">完成</button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {
  value = "";
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
  update() {
    if (this.value !== "" && this.currentTag) {
      this.$store.commit("updateTag", {
        id: this.currentTag.id,
        name: this.value,
      });
      this.$store.commit("fetchTags");
    } else {
      alert("请输入新标签名");
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .topBar {
    font-family: $font-hei;
    font-size: 16px;
    line-height: 16px;
    background: #49ad95;
    text-align: center;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .back {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 25px;
      height: 25px;
    }
    .wrapperIcon {
      border-radius: 50%;
      padding: 8px;
      background: white;
      .icon {
        height: 30px;
        width: 30px;
      }
    }
    .tagName {
      padding-top: 15px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 16px;
  }
  .wrapperOprate {
    position: relative;
    height: 100%;
    .oprate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;

      box-shadow: 0px -1px rgb(230, 218, 218);
      display: flex;
      justify-content: space-around;
      button {
        border: none;
        font-size: 16px;
        line-height: 1.2;
        width: 50%;
        padding: 16px 0;
        background: white;
      }
      .remove {
        border-right: 1px solid rgb(230, 218, 218);
      }
    }
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