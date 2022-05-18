<template>
  <Layout>
    {{ monthSum }}
    <FormItem type="month" :value.sync="monthTime" />
    <Tab
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
      :monthRecordList="monthRecordList"
      @update:total="monthSum = $event"
      @click="getResult"
    />
    <Chart :options="chartOptions" />
    <div v-for="item in sameTypeMonthRecordList" :key="item[0].icon">
      <Icon :name="item[0].icon" />
      <div>
        <li>
          <ol>
            {{
              item[0].tag[0]
            }}
          </ol>
          <ol>
            {{
              item.length.toString() + "笔"
            }}
          </ol>
          <ol>
            {{
              Math.round((Number(sum(item)) / Number(monthSum)) * 10000) / 100 +
              "%"
            }}
          </ol>
          <ol>
            {{
              sum(item)
            }}
          </ol>
        </li>
        <div>进度条</div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList";
import changeDateStyle from "@/lib/changeDateStyle";
import { Component, Vue, Watch } from "vue-property-decorator";
import Chart from "@/components/Chart.vue";
import clone from "@/lib/clone";
import sum from "@/lib/sum";

@Component({
  components: { Tab, Layout, Chart },
})
export default class Statistics extends Vue {
  pageValue = false;
  type = "";
  recordTypeList = recordTypeList;
  monthTime = "";
  monthRecordList: RecordItem[] = [];
  sameMonthRecordList: any = [];
  sameTypeMonthRecordList: any = [];
  monthSum: string = "";
  sum = sum;

  get recordList() {
    return this.$store.state.recordList;
  }
  get selectedType() {
    this.$store.commit("fetchSelectedType");
    return this.$store.state.selectedType;
  }
  @Watch("monthTime", { immediate: true })
  onMonthTimeValueChange() {
    if (this.monthTime === "") {
      this.monthTime = changeDateStyle("YYYY-MM");
    }
    this.monthRecordList = clone(this.recordList).filter(
      (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
    );
    this.sameMonthRecordList.splice(0);
    let newMonthRecordList = clone(this.monthRecordList);
    let count = newMonthRecordList.length;
    let container: RecordItem[] = [];
    for (let i = 0; i < count; i) {
      for (let j = 1; j < count; j++) {
        let index = j;
        if (
          newMonthRecordList.length !== 0 &&
          newMonthRecordList[0].tag[0] === newMonthRecordList[index].tag[0]
        ) {
          container.push(newMonthRecordList[index]);
          newMonthRecordList.splice(index, 1);
          j -= 1;
          count -= 1;
        }
      }
      container.push(newMonthRecordList[0]);
      newMonthRecordList.splice(0, 1);
      count -= 1;
      this.sameMonthRecordList.push(container);
      // 使用 container.splice(0) 清空数组时会改变原数组，导致 push 进去的 container 为空数组
      container = [];
    }
    this.getResult();
  }
  // 使用 getter 函数，可动态返回计算值（对象和键值对）
  get chartOptions() {
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
  created() {
    this.getResult();
  }
  getResult() {
    this.sameTypeMonthRecordList = this.sameMonthRecordList
      .map((r: RecordItem[]) => r.filter((t) => t.type === this.selectedType))
      .filter((r: any) => r.length !== 0);
    return this.sameTypeMonthRecordList;
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
