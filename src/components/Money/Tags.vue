<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in value"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import createTag from "@/lib/createTag";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly value: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string): void {
    let index = this.selectedTags.indexOf(tag);
    if (index < 0) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }
  create() {
    createTag();
  }
}
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
  overflow: auto;
  .current {
    display: flex;
    list-style: none;
    margin: 4px;
    flex-flow: wrap;
    li {
      padding: 0 18px;
      border-radius: 12px;
      background: #d9d9d9;
      margin: 12px;
      &.selected {
        background: burlywood;
      }
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