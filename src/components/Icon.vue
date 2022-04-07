<template>
  <svg class="icon"><use :xlink:herf="'#' + name" /></svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ["name"], // 加中括号
  name: "Icon",
};
</script>

<style lang="scss" scoped>
</style>