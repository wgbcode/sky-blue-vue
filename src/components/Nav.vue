<template>
  <div class="nav">
    <router-link to="/labels">标签页</router-link>
    |
    <router-link to="/money">记账页</router-link>
    |
    <router-link to="/statistics">统计页</router-link>
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