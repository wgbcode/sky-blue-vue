<template>
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
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tab {
  font-size: 24px;
  line-height: 22px;
  font-family: $font-hei;
  background: #c4c4c4;
  display: flex;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px 0;
    width: 50%;
    &.selected::after {
      position: absolute;
      height: 3px;
      width: 100%;
      background: red;
      content: "";
      bottom: 0;
      left: 0;
    }
  }
}
</style>