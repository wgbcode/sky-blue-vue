<template>
  <Layout>
    <Tags :value="tagList" :selectedTag.sync="record.tags" />
    <FormItem
      field-name="备注"
      placeholder="在这里输入备注"
      :value.sync="record.notes"
    />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({
  components: { Tags, Types, NumberPad },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  get tagList() {
    return this.$store.state.tagList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    this.record.createdAt = new Date();
    this.$store.commit("createRecord", this.record);
  }
}
</script>