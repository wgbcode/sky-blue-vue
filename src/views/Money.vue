<template>
  <Layout>
    <Tab :data-source="recordTypeList" :value.sync="record.type" />
    <Tags :value="tagList" :selectedTag.sync="record.tags" />
    <FormItem
      field-name="备注"
      placeholder="在这里输入备注"
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
  get tagList() {
    return this.$store.state.showTagList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchTags");
  }
  saveRecord() {
    this.record.createdAt = new Date().toISOString();
    this.$store.commit("createRecord", this.record);
  }
}
</script>