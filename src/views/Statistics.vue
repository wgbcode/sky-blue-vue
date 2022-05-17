<template>
  <Layout>
    <FormItem type="month" :value.sync="monthTime" />
    <Tab
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
      :monthRecordList="monthRecordList"
    />
    <div>图</div>
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList";
import changeDateStyle from "@/lib/changeDateStyle";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: { Tab, Layout },
})
export default class Statistics extends Vue {
  pageValue = false;
  type = "";
  recordTypeList = recordTypeList;
  monthTime = changeDateStyle("YYYY-MM");
  monthRecordList = this.recordList.filter(
    (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
  ); // BUG：单独在此页面刷新时无法加载数据，monthRecordList = []
  sameMonthRecordList: any = [];
  container: any = [];

  get recordList() {
    return this.$store.state.recordList;
  }
  @Watch("monthTime")
  onMonthTimeValueChange() {
    this.monthRecordList = this.recordList.filter(
      (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
    );

    this.sameMonthRecordList.splice(0);
    let newMonthRecordList = this.monthRecordList;
    let count = newMonthRecordList.length;
    for (let i = 0; i < count; i) {
      console.log("newMonthRecordList[0]", newMonthRecordList[0]);
      this.container.push(newMonthRecordList[0]); // BUG：push 进去后，container.length = 0，但实质不为 0
      console.log("container", this.container);
      for (let j = 0; j < count - 1; j++) {
        let index = j + 1;
        if (
          newMonthRecordList.length !== 0 &&
          newMonthRecordList[0].tag[0] === newMonthRecordList[index].tag[0]
        ) {
          {
            this.container.push(newMonthRecordList[index]);
            newMonthRecordList.splice(index, 1);
            j -= 1;
            count -= 1;
          }
        }
      }
      this.sameMonthRecordList.push(this.container);
      newMonthRecordList.splice(0, 1);
      count -= 1;
    }
    this.container.splice(0);
    console.log("this.sameMonthRecordList", this.sameMonthRecordList);
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
