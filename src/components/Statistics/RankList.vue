<template>
  <div>
    <header class="title">排行榜</header>
    <div v-for="item in value" :key="item[0].tag[0]" class="list">
      <div class="wrapperIcon">
        <Icon :name="item[0].icon" />
      </div>
      <div class="wrapperListContent">
        <ol class="listContent">
          <li class="tagName">
            {{ item[0].tag[0] }}
          </li>
          <li class="tagCount">
            {{ item.length.toString() + "笔" }}
          </li>
          <li class="percent">
            {{
              Math.round((Number(sum(item)) / Number(monthSum)) * 10000) / 100 +
              "%"
            }}
          </li>
          <li class="sum">
            {{ sum(item) }}
          </li>
        </ol>
        <ol class="inBar">
          <li
            class="outBar"
            :style="{
              width:
                Math.round((Number(sum(item)) / Number(monthSum)) * 10000) /
                  100 +
                '%',
            }"
          ></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import sum from "@/lib/sum";

@Component
export default class RankList extends Vue {
  @Prop(Array) readonly value!: RecordItem[][];
  @Prop(String) readonly monthSum!: string;
  sum = sum;
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  line-height: 1.2;
  background: white;
  padding: 8px 0 4px 16px;
}
.list {
  display: flex;
  background: white;
  padding: 10px 0;
  .wrapperIcon {
    display: flex;
    align-items: center;
    padding: 8px 16px 8px 16px;
    .icon {
      height: 25px;
      width: 25px;
    }
  }
  .wrapperListContent {
    width: 100%;
    font-size: 16px;
    line-height: 1.2;
    .listContent {
      display: flex;
      list-style: none;
      position: relative;
      .tagName {
        padding: 5px 10px 5px 0;
      }
      .tagCount {
        padding: 5px 10px 5px 0;
      }
      .percent {
        padding: 5px 10px 5px 0;
      }
      .sum {
        position: absolute;
        top: 5px;
        right: 16px;
        color: #79ada1;
      }
    }
    .inBar {
      list-style: none;
      width: 90%;
      background: black;
      height: 3px;
      background: #c9c5c5;
      .outBar {
        background: red;
        height: 3px;
        background: #79ada1;
      }
    }
  }
}
</style>