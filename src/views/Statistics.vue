<template>
  <Layout>
    <FormItem type="month" :value.sync="monthTime" />
    <Tab
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
      :monthRecordList="monthRecordList"
    />
    <Chart :options="chartOptions" />
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
  sameMonthRecordList: any = [];

  get recordList() {
    return this.$store.state.recordList;
  }
  @Watch("monthTime", { immediate: true })
  onMonthTimeValueChange() {
    if (this.monthTime === "") {
      this.monthTime = changeDateStyle("YYYY-MM");
    }
    // console.log("this.recordList", this.recordList); // BUG：在当前页面刷新时无法获取 recordList
    this.monthRecordList = this.recordList.filter(
      (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
    );
    console.log("this.monthRecordList", this.monthRecordList); // BUG: 赋值时控制台打印出的 length = 0
    console.log("this.monthRecordList[0]", this.monthRecordList[0]);
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
      console.log("container", container); // BUG：同样，push 进去后，控制台显示 length = 0
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
        text: "", //主标题文本
        subtext: "支出", //副标题文本
        left: "center",
        top: "39%",
        textStyle: {
          fontSize: 38,
          color: "#454c5c",
          align: "center",
        },
        subtextStyle: {
          fontFamily: "微软雅黑",
          fontSize: 16,
          color: "#6c7a89",
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
          data: [
            { value: 1048, name: "消费" },
            { value: 335, name: "交通" },
            { value: 310, name: "饮食" },
            { value: 335, name: "交通" },
            { value: 335, name: "交通" },
            { value: 335, name: "交通" },
          ],
        },
      ],
    };
  }
}
</script>

<style lang="scss" scoped>
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
