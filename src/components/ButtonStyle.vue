<template>
  <div class="createTag-Wrapper">
    <button class="createTag" @click="$emit('click', $event)"><slot /></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ButtonStyle extends Vue {}
</script>

<style lang="scss" scoped>
.createTag {
  font-size: 17px;
  line-height: 22px;
  color: white;
  background: #767676;
  border: none;
  padding: 9px 16px;
  border-radius: 4px;
  &-Wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 44px;
  }
}
</style>