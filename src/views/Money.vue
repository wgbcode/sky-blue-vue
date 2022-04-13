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
import recordListModel from "@/models/recordListModel";

let recordList: RecordItem[] = recordListModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: ["衣", "食", "住", "行"],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: RecordItem[] = recordList;
  saveRecord(): void {
    this.record.creatAt = new Date();
    recordList.push(recordListModel.clone(this.record));
    recordListModel.save(recordList);
  }
}
</script>