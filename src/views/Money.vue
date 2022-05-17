<template>
  <Layout>
    {{ record }}
    <Tab :data-source="recordTypeList" :value.sync="record.type" />
    <Tags
      :value="showTagList"
      :selectedTag.sync="record.tag"
      :selectedIcon.sync="record.icon"
    />
    <FormItem type="date" :value.sync="record.createdAt" field-name="时间" />
    <FormItem
      field-name="备注"
      placeholder="请在这里输入备注"
      :value.sync="record.notes"
    />
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Tab from "@/components/Tab.vue";
import recordTypeList from "@/constants/recordTypeList";
import NumberPad from "@/components/Money/NumberPad.vue";
import dayjs from "dayjs";
import changeDateStyle from "@/lib/changeDateStyle";

@Component({
  components: { Tags, Tab, NumberPad },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: changeDateStyle("YYYY-MM-DD"),
    icon: "",
  };
  recordTypeList = recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  get showTagList() {
    return this.$store.state.showTagList;
  }
  saveRecord() {
    if (this.record.tag.length === 0) {
      alert("请选择类型");
    } else if (this.record.amount === 0) {
      alert("请输入金额");
    } else {
      this.$store.commit("createRecord", this.record);
      this.record.tag = [];
      this.record.notes = "";
      this.record.createdAt = dayjs(new Date().toISOString()).format(
        "YYYY-MM-DD"
      );
      this.$store.state.selectedTagName = [];
      alert("已成功保存");
    }
  }
}
</script>