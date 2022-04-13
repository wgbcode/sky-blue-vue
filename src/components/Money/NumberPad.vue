<template>
  <div class="numberPad">
    <div class="output">{{ this.output }}</div>
    <div class="button">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="OK" class="OK">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  inputContent(event: MouseEvent): void {
    let button = event.target as HTMLButtonElement;
    let content = button.textContent as string;
    let index = "0123456789".indexOf(content) >= 0;
    if (this.output.length >= 16) return;
    if (this.output === "0") {
      if (index) {
        this.output = content;
      } else {
        this.output = this.output + content;
      }
    } else {
      if (content === "." && this.output.indexOf(".") < 0) {
        this.output = this.output + content;
      } else if (index) {
        this.output = this.output + content;
      }
    }
  }
  remove(): void {
    this.output.length === 1
      ? (this.output = "0")
      : (this.output = this.output.slice(0, -1));
  }
  clear(): void {
    this.output = "0";
  }
  OK(): void {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit", parseFloat(this.output));
    this.output = "0";
  }
}
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