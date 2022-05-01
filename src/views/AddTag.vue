<template>
  <div>
    <header class="tagTitle">
      <button>取消</button>
      <div>新增支出类型</div>
      <button>保存</button>
    </header>
    <FormItem
      fieldName="类别名称"
      placeholder="8个字以内"
      class="inputTagName"
    />
    <div class="iconType">
      <div class="iconTitle">类别图标</div>
      <div class="icons">
        <Icon name="eat" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddTag extends Vue {
  changeInputStyle = "changeInputStyle";
}
</script>

<style lang='scss' scoped>
.tagTitle {
  display: flex;
  justify-content: space-between;
  background: #5fab87;
  padding: 16px 16px;
  color: white;
  button {
    border: none;
    background: transparent;
    color: white;
  }
}
.inputTagName {
  background: white;
  padding: 10px 0px;
}
.iconType {
  background: white;
  color: #b0b0b0;
  margin-top: 20px;
  .iconTitle {
    text-align: center;
    padding: 20px 0;
  }
}
</style>