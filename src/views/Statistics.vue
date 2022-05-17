<template>
  <Layout>
    <FormItem type="month" :value.sync="monthTime" />
    <Tab
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
      :monthRecordList="monthRecordList"
    />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions" />
    </div>
    <!-- <li v-for="item in sameMonthRecordList" :key="item[0].tag[0]">
      <ol>
        {{
          item[0].tag[0]
        }}
      </ol>
    </li> -->
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList";
import changeDateStyle from "@/lib/changeDateStyle";
import { Component, Vue, Watch } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";

@Component({
  components: { Tab, Layout, Chart },
})
export default class Statistics extends Vue {
  pageValue = false;
  type = "";
  recordTypeList = recordTypeList;
  monthTime = "";
  monthRecordList = [];
  // BUG：在当前页面刷新时无法获取 recordList
  sameMonthRecordList: any = [];

  get recordList() {
    return this.$store.state.recordList;
  }
  @Watch("monthTime", { immediate: true })
  onMonthTimeValueChange() {
    if (this.monthTime === "") {
      this.monthTime = changeDateStyle("YYYY-MM");
    }
    // console.log("this.recordList", this.recordList);
    this.monthRecordList = this.recordList.filter(
      (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
    );
    // console.log("this.monthRecordList", this.monthRecordList); // BUG: 赋值失败；控制台打印出的 length = 0
    // console.log("this.monthRecordList[0]", this.monthRecordList[0]);
    this.sameMonthRecordList.splice(0);
    let newMonthRecordList = this.monthRecordList;
    let count = newMonthRecordList.length;
    let container: any = [];
    for (let i = 0; i < count; i) {
      for (let j = 0; j < count - 1; j++) {
        let index = j + 1;
        if (
          newMonthRecordList.length !== 0
          //  && newMonthRecordList[0].tag[0] === newMonthRecordList[index].tag[0]
        ) {
          {
            container.push(newMonthRecordList[index]);
            newMonthRecordList.splice(index, 1);
            j -= 1;
            count -= 1;
          }
        }
      }
      // console.log("container", container); // BUG：push 进去后，控制台显示 length = 0，但打印和实质都不为 0
      this.sameMonthRecordList.push(container);
      newMonthRecordList.splice(0, 1);
      count -= 1;
      container.splice(0);
    }
    // console.log("this.sameMonthRecordList", this.sameMonthRecordList);
  }
  // 使用 getter 函数，可动态返回计算值（对象和键值对）
  get chartOptions() {
    return {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  max-width: 100%;
  height: 400px;
}
::v-deep .type-tabWrapper {
  background: white;
  color: #535152;
  .type-tab {
    font-size: 16px;
    line-height: 22px;
    display: flex;
    justify-content: center;
    padding: 20px 0 20px 0;
    .type-li {
      padding: 0px 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      .outSum {
        color: #49ad95;
        padding: 5px 0 5px 0;
      }
      .inSum {
        color: #f71061;
        padding: 5px 0 5px 0;
      }
      &.selected::after {
        position: absolute;
        display: block;
        content: "";
        clear: both;
        background: #49ad95;
        bottom: 0;
        height: 3px;
        width: 15%;
      }
    }
  }
}

.title {
  font-size: 17px;
  line-height: 22px;
  padding: 9px 16px;
}
.record {
  font-size: 17px;
  line-height: 22px;
  padding: 9px 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  .notes {
    color: #9f9f9f;
  }
}
.noresult {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
