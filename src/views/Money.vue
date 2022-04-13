<template>
  <Layout>
    {{ tags }}
    <Tags :value.sync="tags" @update:value2="saveRecord" />
    <FormItem
      field-name="备注"
      placeholder="在这里输入备注"
      @update:value="onUpdateNotes"
    />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

let recordList: RecordItem[] = recordListModel.fetch();
let tagList = tagListModel.fetch();

@Component({
  components: { Tags, Types, NumberPad },
})
export default class Money extends Vue {
  tags = tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: RecordItem[] = recordList;
  onUpdateTags(value2: string[]) {
    this.record.tags = value2;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    console.log("record2");
    console.log(record2);
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    console.log("this.recordList");
    console.log(this.recordList);
    recordListModel.save(this.recordList);
  }
}
</script>