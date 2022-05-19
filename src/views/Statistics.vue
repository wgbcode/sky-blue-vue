<template>
  <Layout>
    <FormItem type="month" :value.sync="monthTime" />
    <div class="outWrapper">
      <Tab
        class-prefix="type"
        :data-source="recordTypeList"
        :monthRecordList="monthRecordList"
        @update:total="monthSum = $event"
        @click="getResult"
      />
      <div v-if="monthSum !== '0.00'">
        <div class="wrapperChart">
          <Chart :options="chartOptions" />
        </div>
        <div>
          <header class="title">支出排行榜</header>
          <div
            v-for="item in sameTypeMonthRecordList"
            :key="item[0].tag[0]"
            class="list"
          >
            <div class="wrapperIcon">
              <Icon :name="item[0].icon" />
            </div>
            <div class="wrapperListContent">
              <ol class="listContent">
                <li class="tagName">
                  {{ item[0].tag[0] }}
                </li>
                <li class="tagCount">
                  {{ item.length.toString() + "笔" }}
                </li>
                <li class="percent">
                  {{
                    Math.round((Number(sum(item)) / Number(monthSum)) * 10000) /
                      100 +
                    "%"
                  }}
                </li>
                <li class="sum">
                  {{ sum(item) }}
                </li>
              </ol>
              <ol class="inBar">
                <li class="outBar"></li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="noRecordData" v-else>
        <div><Icon name="noData" /></div>
        <span class="noRecordText">暂无记录数据</span>
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
  recordTypeList = recordTypeList;
  monthTime = "";
  monthRecordList: RecordItem[] = [];
  sameMonthRecordList: any = [];
  sameTypeMonthRecordList: any = [];
  monthSum: string = "0.00";
  sum = sum;

  get recordList() {
    return this.$store.state.recordList;
  }
  get selectedType() {
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
    let arr: any = [];
    let cloneList = clone(this.sameTypeMonthRecordList);
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

.outWrapper {
  overflow: auto;
  height: 100%; // 父元素已设置 flow-grow = 1
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  .wrapperChart {
    margin-bottom: 12px;
  }

  .title {
    font-size: 12px;
    line-height: 1.2;
    background: white;
    padding: 8px 0 4px 16px;
  }
  .list {
    display: flex;
    background: white;
    padding: 10px 0;
    .wrapperIcon {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      .icon {
        height: 25px;
        width: 25px;
      }
    }
    .wrapperListContent {
      width: 100%;
      font-size: 16px;
      line-height: 1.2;
      .listContent {
        display: flex;
        list-style: none;
        position: relative;
        .tagName {
          padding: 5px 10px 5px 0;
        }
        .tagCount {
          padding: 5px 10px 5px 0;
        }
        .percent {
          padding: 5px 10px 5px 0;
        }
        .sum {
          position: absolute;
          top: 5px;
          right: 16px;
          color: #79ada1;
        }
      }
      .inBar {
        list-style: none;
        width: 90%;
        background: black;
        height: 3px;
        background: #c9c5c5;
        .outBar {
          background: red;
          width: 50%; // 需要拿到比例数据
          height: 3px;
          background: #79ada1;
        }
      }
    }
  }
  .noRecordData {
    display: flex;
    background: white;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    .icon {
      width: 100px;
      height: 100px;
    }
    .noRecordText {
      color: #aeadad;
    }
  }
}
</style>
