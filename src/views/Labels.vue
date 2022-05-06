<template>
  <Layout>
    <div>
      <div class="tags">
        <router-link
          class="router"
          v-for="tag in tags"
          :key="tag.id"
          :to="`/labels/edit/${tag.id}`"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" />
        </router-link>
      </div>
      <ButtonStyle @click="createTag"><slot>新增标签</slot></ButtonStyle>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Mixins } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";

@Component
export default class Labels extends Mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  // beforeCreate() {
  //   this.$store.commit("fetchTags");
  // }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  line-height: 16px;
  background: white;
  list-style: none;
  .router {
    padding: 12px 16px 16px 0;
    display: flex;
    justify-content: space-between;
    box-shadow: inset 0px -0.5px 0px #bcbbc1;
    margin-left: 16px;
  }
}
</style>