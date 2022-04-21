<template>
  <layout>
    <Tab class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
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
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";

@Component({
  components: { Tab, Layout },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;
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