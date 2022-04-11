<template>
  <Layout>
    <Tags :value.sync="record.tags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @update:value="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

let recordList: Record[] = JSON.parse(
  window.localStorage.getItem("recordList") || "[]"
);
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  creatAt?: Date;
};
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  record: Record = {
    tags: ["衣", "食", "住", "行"],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: Record[] = recordList;
  saveRecord(): void {
    this.record.creatAt = new Date();
    let record2 = JSON.parse(JSON.stringify(this.record));
    recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChanged(): void {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>