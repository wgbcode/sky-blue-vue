<template>
  <div>
    <label class="notes">
      <span>备注</span>
      <input type="text" v-model="value" placeholder="在这里添加备注" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  @Watch("value")
  onValueChanged(value: string): void {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 16px;
  background: inherit;
  white-space: nowrap;
  span {
    padding: 25px 16px;
  }
  input {
    height: 65px;
    flex-grow: 1;
    background: inherit;
    border: none;
  }
  input:focus {
    outline: none;
  }
}
</style>