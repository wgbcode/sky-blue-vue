<template>
  <div>
    <div class="topBar">
      <Icon name="left" />
      <span>编辑标签</span>
      <Icon />
    </div>
    <div class="content">
      <span>标签名</span>
      <input type="text" placeholder="标签名是?" />
    </div>
    <ButtonStyle><slot>删除标签</slot></ButtonStyle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {}
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
  span {
    margin-right: 12px;
  }
}
</style>