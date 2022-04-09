<template>
  <Layout>
    <Tags />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from '@/components/Money/NumberPad.vue';
NumberPad
export default {
  name: "Money",
  components: { Tags, Notes,Types,NumberPad},
};
</script>