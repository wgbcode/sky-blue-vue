<template>
  <Layout>
    <div class="wrapperTags">
      <ol>
        <li>
          <Tab :data-source="recordTypeList" />
        </li>
      </ol>
      <ol class="tags">
        <li v-if="showTagList.length !== 0">
          <router-link
            class="router"
            v-for="tag in showTagList"
            :key="tag.id"
            :to="`/labels/edit/${tag.id}`"
          >
            <Icon :name="tag.icon" class="leftIcon" />
            <span class="tagName">{{ tag.name }}</span>
            <Icon name="right" class="rightIcon" />
          </router-link>
        </li>
        <li v-else><NoData>请添加标签</NoData></li>
        <div class="wrapperAddTag">
          <button>
            <router-link :to="`/addTag`">新增标签</router-link>
          </button>
        </div>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Mixins } from "vue-property-decorator";
import TagHelper from "@/mixins/TagHelper";
import recordTypeList from "@/constants/recordTypeList";
import NoData from "@/components/Statistics/NoData.vue";

@Component({
  components: { NoData },
})
export default class Labels extends Mixins(TagHelper) {
  recordTypeList = recordTypeList;
  get selectedType() {
    return this.$store.state.selectedType;
  }
  get showTagList() {
    return this.$store.state.showTagList;
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
      padding: 16px 16px 12px 0;
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
    .wrapperAddTag {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      button {
        background: white;
        border: none;
        background: #bcbbc1;
        padding: 12px 24px;
        margin: 52px 0 28px 0;
        border-radius: 4px;
      }
    }
  }
}
</style>