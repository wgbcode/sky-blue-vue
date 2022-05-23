<template>
  <Layout>
    <Tab :data-source="recordTypeList" />
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
    <QRCode />
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
import QRCode from "@/components/Money/QRCode.vue";

@Component({
  components: { Tags, Tab, NumberPad, QRCode },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: [],
    notes: "",
    type: "",
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
  get selectedType() {
    return this.$store.state.selectedType;
  }
  saveRecord() {
    if (this.record.tag.length === 0) {
      alert("请选择类型");
    } else if (this.record.amount === 0) {
      alert("请输入金额");
    } else {
      this.record.type = this.selectedType;
      this.$store.commit("createRecord", this.record);
      this.record.tag = [];
      this.record.notes = "";
      this.record.createdAt = dayjs(new Date().toISOString()).format(
        "YYYY-MM-DD"
      );
      this.$store.state.selectedTagName = []; // 保存后撤消被选择的 tag
      alert("已成功保存");
    }
  }
}
</script>