<template>
  <Layout>
    <Tags :value.sync="record.tags" @update:value="onUpdateTags" />
    <Notes :value.sync="record.notes" />
    <Types :value.sync="record.type" />
    <NumberPad :value.sync="record.amount" @update:value="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

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
}
</script>