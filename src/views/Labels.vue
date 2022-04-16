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
      <ButtonStyle @click="create"><slot>新增标签</slot></ButtonStyle>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "@/components/Icon.vue";
import { Component } from "vue-property-decorator";
import store2 from "@/store/index2";

@Component({
  components: { Icon },
})
export default class Labels extends Vue {
  tags = store2.tagList;
  create() {
    const name = window.prompt("请输出标签名");
    store2.createTag(name);
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
</style>