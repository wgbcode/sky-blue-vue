<template>
  <Layout>
    <Tab :data-source="recordTypeList" :value.sync="record.type" />
    <Tags :value="showTagList" :selectedTag.sync="record.tags" />
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

@Component({
  components: { Tags, Tab, NumberPad },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  get showTagList() {
    return this.$store.state.showTagList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    this.record.createdAt = new Date().toISOString();
    this.$store.commit("createRecord", this.record);
  }
}
</script>