<template>
  <Layout>
    <div>
      <ul class="tags">
        <li><span>衣</span> <Icon name="right" /></li>
        <li><span>食</span> <Icon name="right" /></li>
        <li><span>住</span> <Icon name="right" /></li>
        <li><span>行</span> <Icon name="right" /></li>
      </ul>
      <div class="createTag-Wrapper">
        <button class="createTag">新增标签</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Icon from "@/components/Icon.vue";
export default {
  components: { Icon },
  name: "Labels",
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  line-height: 16px;
  background: white;
  list-style: none;
  li {
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