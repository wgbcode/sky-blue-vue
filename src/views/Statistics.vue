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
        <CurChart :value="sameTypeMonthRecordList" />
        <RankList :value="sameTypeMonthRecordList" :monthSum="monthSum" />
      </div>
      <div v-else>
        <NoData />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tab from "@/components/Tab.vue";
import changeDateStyle from "@/lib/changeDateStyle";
import { Component, Vue, Watch } from "vue-property-decorator";
import clone from "@/lib/clone";
import sum from "@/lib/sum";
import CurChart from "@/components/Statistics/CurChart.vue";
import RankList from "@/components/Statistics/RankList.vue";
import NoData from "@/components/Statistics/NoData.vue";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tab, Layout, CurChart, RankList, NoData },
})
export default class Statistics extends Vue {
  recordTypeList = recordTypeList;
  monthTime = "";
  monthRecordList: RecordItem[] = [];
  sameMonthRecordList: RecordItem[][] = [];
  sameTypeMonthRecordList: RecordItem[][] = [];
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
}
</style>
