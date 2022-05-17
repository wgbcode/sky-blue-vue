<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as echarts from "echarts";
import { EChartsOption, ECharts } from "echarts";
@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption;
  chart?: ECharts;
  mounted() {
    if (this.options === undefined) {
      return console.error("options 为空");
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options); // this.options 需要是函数，加 get 可立即执行
  }
  @Watch("options")
  onOptionsChange(newValue: EChartsOption) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>