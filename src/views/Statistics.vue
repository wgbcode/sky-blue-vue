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
    <!-- <ol v-for="item in monthSameRecordList" :key="item[0].tag">
      <div>支出排行榜</div>
      <li>
        <Icon name="money" />
        <div>{{ item }}</div>
      </li>
    </ol> -->
    <!-- <ol class="records" v-if="result.length !== {}">
      <li v-for="group in result" :key="group.id">
        <h3 class="title">{{ beautify(group.title) }}</h3>{{}}
        <div v-for="item in group.items" :key="item.tags.id" class="record">
          <span> {{ item.tags[0].name }}</span>
          <span class="notes">{{ item.notes }}</span>
          <span>￥{{ item.amount }}</span>
        </div>
      </li>
    </ol>
    <div v-else class="noresult">
      <span> 目标没有相关记录</span>
    </div> -->
  </Layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList";
import changeDateStyle from "@/lib/changeDateStyle";
// import dayjs from "dayjs";
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
  ); // 第一次未执行（刷新），但为什么切换路由时会执行？
  monthSameRecordList: any = [];
  container: any = [];
  @Watch("monthTime")
  onMonthTimeValueChange() {
    this.monthSameRecordList.splice(0);
    this.monthRecordList = this.recordList.filter(
      (r: RecordItem) => r.createdAt.slice(0, -3) === this.monthTime
    );

    let newMonthRecordList = this.monthRecordList;
    let count = newMonthRecordList.length;
    for (let i = 0; i < count; i) {
      console.log("newMonthRecordList[0]");
      console.log(newMonthRecordList[0]);
      this.container.push(newMonthRecordList[0]);
      console.log("container");
      console.log(this.container);
      for (let j = 0; j < count - 1; j++) {
        let index = j + 1;
        if (
          newMonthRecordList.length !== 0 &&
          newMonthRecordList[0].tag[0] === newMonthRecordList[index].tag[0]
        ) {
          {
            // console.log("newMonthRecordList[index]");
            // console.log(newMonthRecordList[index]);
            this.container.push(newMonthRecordList[index]);
            // console.log("container");
            // console.log(container);
            newMonthRecordList.splice(index, 1);
            j -= 1;
            count -= 1;
          }
        }
      }
      // console.log("container");
      // console.log(container);
      this.monthSameRecordList.push(this.container);
      newMonthRecordList.splice(0, 1);
      count -= 1;
    }
    this.container.splice(0);
    console.log("this.monthSameRecordList");
    console.log(this.monthSameRecordList);
  } // BUG:在本页面刷新时无法读取 selectedRecordList

  get recordList() {
    return this.$store.state.recordList;
  }
  // get result() {
  //   let { recordList } = this
  //   let newRecordList = clone(recordList)
  //     .filter((item: { type: string }) => item.type === this.type)
  //     .sort(
  //       (a: RecordItem, b: RecordItem) =>
  //         dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  //     )
  //   let hashTable: { [key: string]: { title: string; items: RecordItem[] } } =
  //     {}
  //   for (let i = 0; i < newRecordList.length; i++) {
  //     let [date] = newRecordList[i].createdAt!.split('T')
  //     hashTable[date] = hashTable[date] || { title: date, items: [] }
  //     hashTable[date].items.push(newRecordList[i])
  //   }
  //   return hashTable
  // }
  // beautify(string: string) {
  //   const day = dayjs(string);
  //   const now = dayjs();
  //   if (day.isSame(now, "day")) {
  //     return "今天";
  //   } else if (day.isSame(now.subtract(1, "day"), "day")) {
  //     return "昨天";
  //   } else if (day.isSame(now.subtract(2, "day"), "day")) {
  //     return "前天";
  //   } else if (day.isSame(now, "year")) {
  //     return day.format("M月D日");
  //   } else {
  //     return day.format("YYYY年M月D日");
  //   }
  // }
  // created() {
  //   this.$store.commit("fetchRecords");
  // } // 如何设置在每次刷新页面时都调用 fetchReords
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
