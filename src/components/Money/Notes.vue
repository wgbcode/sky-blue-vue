<template>
  <div>
    <label class="notes">
      <span>备注</span>
      <input type="text" placeholder="在这里添加备注" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notes extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
  font-size: 16px;
  background: inherit;
  white-space: nowrap;
  span {
    padding: 25px 16px;
  }
  input {
    height: 65px;
    width: 100%;
    background: inherit;
    border: none;
  }
}
</style>