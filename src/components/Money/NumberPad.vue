<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="button">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="OK">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  display: flex;
  flex-direction: column;
  .output {
    font-size: 36px;
    line-height: 22px;
    height: 72px;
    padding: 25px 16px;
    text-align: right;
    font-family: Consolas, monospace;
    background: white;
  }
  button {
    @extend %clearFix;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    width: 25%;
    border: none;
    padding: 21px 0;
    &.OK {
      height: 128px;
      float: right;
    }
    &.zero {
      width: 50%;
      float: left;
    }
    $bg: #f2f2f2;
    &:nth-child(1) {
      background: darken($bg, 4%);
    }
    &:nth-child(2),
    &:nth-child(5) {
      background: darken($bg, 8%);
    }
    &:nth-child(3),
    &:nth-child(6),
    &:nth-child(9) {
      background: darken($bg, 12%);
    }
    &:nth-child(4),
    &:nth-child(7),
    &:nth-child(10) {
      background: darken($bg, 16%);
    }
    &:nth-child(8),
    &:nth-child(11),
    &:nth-child(13) {
      background: darken($bg, 20%);
    }
    &:nth-child(14) {
      background: darken($bg, 24%);
    }
    &:nth-child(12) {
      background: darken($bg, 28%);
    }
  }
}
</style>