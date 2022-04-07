<template>
  <div class="nav">
    <router-link to="/labels">
      <Icon name="label" />
      <span>标签页</span>
    </router-link>
    <router-link to="/money">
      <Icon name="money" />
      <span>记账页</span>
    </router-link>
    <router-link to="/statistics">
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
  border: 1px solid red;
}
</style>