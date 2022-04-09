<template>
  <div class="tags">
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 16px;
  line-height: 22px;
  background: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-around;
  .current {
    display: flex;
    list-style: none;
    margin: 4px;
    li {
      padding: 0 18px;
      border-radius: 12px;
      background: #d9d9d9;
      margin: 12px;
    }
  }
  .new {
    margin: 4px 0 8px 16px;
    padding: 0 4px;
    button {
      background: transparent;
      border: none;
      color: #b2b2b2;
      border-bottom: 1px solid #a6a6a6;
    }
  }
}
</style>