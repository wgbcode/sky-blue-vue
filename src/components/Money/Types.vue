<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selecteType('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selecteType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = "-";
  selecteType(type: string): void {
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.types {
  font-size: 24px;
  line-height: 22px;
  font-family: $font-hei;
  background: #c4c4c4;
  display: flex;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px 0;
    width: 50%;
    &.selected::after {
      position: absolute;
      height: 3px;
      width: 100%;
      background: red;
      content: "";
      bottom: 0;
      left: 0;
    }
  }
}
</style>