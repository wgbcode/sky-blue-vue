<template>
  <layout>
    <Tab class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <ol class="records">
      <li v-for="group in result" :key="group.id">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <div v-for="item in group.items" :key="item.tags.id" class="record">
          <span> {{ item.tags[0].name }}</span>
          <span class="notes">{{ item.notes }}</span>
          <span>￥{{ item.amount }}</span>
        </div>
      </li>
    </ol>
  </layout>
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
  type = "-";
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
      console.log("hi");
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
}
</script>

<style lang="scss" scoped>
::v-deep .type-item-tab {
  background: white;
  &.selected {
    background: bisque;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-item-tab {
  background: white;
  height: 48px;
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
</style>