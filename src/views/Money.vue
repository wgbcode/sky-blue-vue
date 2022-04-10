<template>
  <Layout>
    <Tags :data-source.sync="tags" />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
export default {
  name: "Money",
  components: { Tags, Notes, Types, NumberPad },
  data(): { tags: string[] } {
    return {
      tags: ["衣", "食", "住", "行"],
    };
  },
};
</script>