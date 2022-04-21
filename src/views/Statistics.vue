<template>
  <layout>
    <Tab class-prefix="type" :data-source="typeList" :value.sync="type" />
    <Tab
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    />
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tab from "@/components/Tab.vue";
import Layout from "@/components/Layout.vue";

@Component({
  components: { Tab, Layout },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  intervalList = [
    { text: "日", value: "day" },
    { text: "周", value: "week" },
    { text: "月", value: "month" },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-item-tab {
  background: white;
  &.selected {
    background: bisque;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-item-tab {
  background: white;
}
</style>