<template>
  <Layout>
    <div class="wrapperTags">
      <ol>
        <li class="tagSet">标签设置</li>
        <li>
          <Tab :data-source="recordTypeList" />
        </li>
      </ol>
      <ol class="tags">
        <li>
          <router-link
            class="router"
            v-for="tag in sameTypeTagList"
            :key="tag.id"
            :to="`/labels/edit/${tag.id}`"
          >
            <Icon :name="tag.icon" class="leftIcon" />
            <span class="tagName">{{ tag.name }}</span>
            <Icon name="right" class="rightIcon" />
          </router-link>
        </li>
        <li class="wrapperButton">
          <ButtonStyle @click="createTag"><slot>新增标签</slot></ButtonStyle>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Mixins } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";
import recordTypeList from "@/constants/recordTypeList";

@Component
export default class Labels extends Mixins(TagHelper) {
  recordTypeList = recordTypeList;
  sameTypeTags = [];
  get selectedType() {
    return this.$store.state.selectedType;
  }
  get sameTypeTagList() {
    return this.$store.state.tagList.filter(
      (t: { type: Tag }) => t.type === this.selectedType
    );
  }
}
</script>

<style lang="scss" scoped>
.wrapperTags {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .tagSet {
    font-size: 18px;
    color: white;
    background: #49ad95;
    text-align: center;
    padding: 16px 0 0 0;
    margin-bottom: -16px;
  }
  .tags {
    font-size: 16px;
    line-height: 16px;
    background: white;
    list-style: none;
    overflow: auto;
    height: 100%;
    .router {
      padding: 12px 16px 16px 0;
      display: flex;
      box-shadow: inset 0px -0.5px 0px #bcbbc1;
      margin: 0 16px;
      position: relative;
      .leftIcon {
        height: 20px;
        width: 20px;
      }
      .tagName {
        padding: 0 0 0 16px;
      }
      .rightIcon {
        position: absolute;
        right: 4px;
        top: 12px;
      }
    }
  }
  .wrapperButton {
    flex-grow: 1;
    background: white;
  }
}
</style>