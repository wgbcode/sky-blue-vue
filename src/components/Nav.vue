<template>
  <div class="nav">
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      <span>标签页</span>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      <span>记账页</span>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      <span> 统计页</span>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;
  background: white;
  padding: 8px 0 0 0;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: #5fab87;
  }
}
</style>