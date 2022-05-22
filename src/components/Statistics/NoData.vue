<template>
  <div class="noData">
    <div><Icon name="noData" /></div>
    <span class="noText">暂无记录数据</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NoData extends Vue {}
</script>

<style lang="scss" scoped>
.noData {
  display: flex;
  background: white;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  .icon {
    width: 100px;
    height: 100px;
  }
  .noText {
    color: #aeadad;
  }
}
</style>