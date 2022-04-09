<template>
  <div class="types">
    <span class="selected">支出</span>
    <span>收入</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Types extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
  font-size: 24px;
  line-height: 22px;
  font-family: $font-hei;
  background: #c4c4c4;
  padding: 20px 0;
  display: flex;
  text-align: center;
  position: relative;
  span {
    width: 50%;
    &.selected::after {
      position: absolute;
      height: 3px;
      width: 50%;
      background: red;
      content: "";
      bottom: 0;
      left: 0;
    }
  }
}
</style>