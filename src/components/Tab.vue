<template>
  <div class="tabWrapper">
    <ul class="tab">
      <li
        v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        :class="liClass(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tab extends Vue {
  @Prop({ required: true, type: Array }) readonly dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) readonly classPrefix?: string;
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-item-tab"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
    this.$store.state.selectedType = item.value;
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabWrapper {
  background: #60aa87;
  .tab {
    font-size: 16px;
    line-height: 22px;
    font-family: $font-hei;
    display: flex;
    padding: 20px 0 0 0;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: white;
      margin: 0px 15px;
      padding: 0 0 5px 0;
      &.selected::after {
        position: absolute;
        height: 3px;
        width: 100%;
        background: white;
        content: "";
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>