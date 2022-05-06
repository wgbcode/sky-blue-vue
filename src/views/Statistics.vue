<template>
  <Layout>
    <FormItem type="month" :value.sync="x" @click="popPage" />
    <div class="popPage" v-show="pageValue">
      <header>支出</header>
      <div>1111</div>
    </div>
    <Tab class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <div>图</div>
    <ol class="records" v-if="result.length !== {}">
      <li v-for="group in result" :key="group.id">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <div v-for="item in group.items" :key="item.tags.id" class="record">
          <span> {{ item.tags[0].name }}</span>
          <span class="notes">{{ item.notes }}</span>
          <span>￥{{ item.amount }}</span>
        </div>
      </li>
    </ol>
    <div v-else class="noresult">
      <span> 目标没有相关记录</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tab from "@/components/Tab.vue";
import Layout from "@/components/Layout.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tab, Layout },
})
export default class Statistics extends Vue {
  pageValue = false;
  type = "-";
  x = "2021-05";
  recordTypeList = recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  get result() {
    let { recordList } = this;
    let newRecordList = clone(recordList)
      .filter((item: { type: string }) => item.type === this.type)
      .sort(
        (a: RecordItem, b: RecordItem) =>
          dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    let hashTable: { [key: string]: { title: string; items: RecordItem[] } } =
      {};
    for (let i = 0; i < newRecordList.length; i++) {
      let [date] = newRecordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(newRecordList[i]);
    }
    return hashTable;
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  popPage() {
    this.pageValue = true;
  }
}
</script>

<style lang="scss" scoped>
.popPage {
  position: relative;
  header {
    position: absolute;
    left: 0;
    top: 0;
    height: 200px;
    width: 100%;
    background: yellow;
    z-index: 1;
  }
  div {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
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
      .outSum {
        color: #49ad95;
        padding: 0 0 5px 0;
      }
      .inSum {
        color: #f71061;
        padding: 0 0 5px 0;
      }
      &.selected::after {
        display: block;
        content: "";
        clear: both;
        background: #49ad95;
        height: 3px;
        width: 80%;
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