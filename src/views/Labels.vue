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
          {{ tag.id }}
          <span>{{ tag.name }}</span>
          <Icon name="right" />
        </router-link>
      </div>
      <div class="createTag-Wrapper">
        <button class="createTag" @click="create">新增标签</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Icon.vue";
import createTag from "@/lib/createTag";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component({
  components: { Icon },
})
export default class Labels extends Vue {
  tags = tagListModel.data;
  create() {
    createTag();
  }
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
.createTag {
  font-size: 17px;
  line-height: 22px;
  color: white;
  background: #767676;
  border: none;
  padding: 9px 16px;
  border-radius: 4px;
  &-Wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 44px;
  }
}
</style>