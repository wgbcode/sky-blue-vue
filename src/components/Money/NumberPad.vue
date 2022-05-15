<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
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
      <button @click="OK" class="OK"><h3>保存</h3></button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
    <div class="placeholder"></div>
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
    font-size: 32px;
    height: 36px;
    text-align: right;
    font-family: Consolas, monospace;
    background: inheritc;
    padding: 5px 20px 45px 0;
    align-items: center;
  }
  button {
    @extend %clearFix;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    width: 25%;
    border: none;
    padding: 16px 0;
    background: white;
    outline: 1px solid #e8e8e8;
    &.OK {
      height: 108px;
      float: right;
    }
    &.zero {
      width: 50%;
      float: left;
    }
    &:nth-child(12) {
      background: #5fb39c;
      color: white;
    }
  }
  .placeholder {
    background: white;
    height: 15px;
    outline: 1px solid #e8e8e8;
  }
}
</style>