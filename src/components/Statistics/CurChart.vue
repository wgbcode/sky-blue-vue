<template>
  <div class="wrapperChart">
    <Chart :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";
import clone from "@/lib/clone";
import sum from "@/lib/sum";

@Component({
  components: { Chart },
})
export default class CurChart extends Vue {
  @Prop(Array) readonly value!: RecordItem[][];
  get chartOptions() {
    let arr: any = [];
    let cloneList = clone(this.value);
    let length = cloneList.length;
    for (let i = 0; i < length; i++) {
      let obj = { value: 1, name: "" };
      obj.value = Number(sum(cloneList[0]));
      obj.name = cloneList[0][0].tag[0];
      arr.push(obj);
      obj = { value: 1, name: "" };
      cloneList.splice(0, 1);
    }
    return {
      title: {
        text: "支出",
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 16,
          color: "#454c5c",
          align: "center",
          fontFamily: "微软雅黑",
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["30%", "60%"],
          label: {
            formatter: "{b|{b}} {per|{d}%} ",
            rich: {
              b: {
                color: "#4C5058",
              },
              per: {
                color: "#4C5058",
              },
            },
          },
          data: arr,
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>
.wrapperChart {
  margin-bottom: 12px;
}
</style>