<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: #f5f5f5;
  font-family: $font-song;
}
a {
  text-decoration: none;
  color: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    text-decoration: none;
    color: inherit;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("fetchRecords");
  },
});
</script>


