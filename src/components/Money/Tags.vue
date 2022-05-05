<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in value" :key="tag.name" @click="toggle(tag)">
        <Icon
          :name="tag.icon"
          :class="{ selected: selectedTagName.indexOf(tag.name) >= 0 }"
        />
        <span> {{ tag.name }}</span>
      </li>
      <div class="new">
        <router-link class="router" to="/addTag">
          <Icon name="addTag" />
          <span>添加</span>
        </router-link>
      </div>
      <i></i
      ><i></i
      ><i></i
      ><i></i
      ><i></i>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import addClass from "@/lib/addClass";

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly value: string[] | undefined;
  selectedTagName: string[] = [];
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: Tag): void {
    addClass(tag.name, this.selectedTagName);
    this.$emit("update:selectedTag", this.selectedTagName);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 16px;
  line-height: 22px;
  background: #fbfbf1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  .current {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    display: flex;
    list-style: none;
    flex-flow: wrap;
    overflow: auto;
    justify-content: space-between;
    text-align: center;
    li {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      border-radius: 12px;
      margin: 12px;
      .icon {
        background: #f6f6f6;
        border-radius: 20px;
        height: 35px;
        width: 35px;
        padding: 5px;
      }
      .selected {
        background: #5fab87;
      }
    }
    i {
      width: 65px;
      margin: 12px;
    }
  }

  .router {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    border-radius: 12px;
    margin: 12px;
    .icon {
      background: #f6f6f6;
      border-radius: 20px;
      height: 35px;
      width: 35px;
      padding: 5px;
    }
  }
}
</style>