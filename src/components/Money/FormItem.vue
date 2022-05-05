<template>
  <div>
    <label class="formItem">
      <div class="inputWrapper" v-if="type === 'date'">
        <span class="typeName">{{ this.fieldName }}</span>
        <input
          :type="type || 'text'"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          class="dateInput"
        />
      </div>
      <div v-else>
        <span class="textName">{{ this.fieldName }}</span>
        <input
          :type="type || 'text'"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="this.placeholder"
          class="textInput"
        />
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  onValueChanged(value: string): void {
    this.$emit("update:value", value);
  }
  x(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  background: white;
  .textName {
    padding-right: 16px;
    font-family: $font-hei;
  }
  .textInput {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
  .textInput:focus {
    outline: none;
  }
  .inputWrapper {
    margin: 15px 0 5px 0;
    .typeName {
      padding-right: 16px;
      font-family: $font-hei;
    }
    .dateInput {
      width: 90px;
      border: 1px solid #fbfbf1;
      border-radius: 12px;
      text-align: center;
      background: #fbfbf1;
      padding: 2px 0;
      position: relative;
      &:focus {
        outline: none;
      }
    }
    input::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0px;
      top: 0;
      background: transparency;
      width: 90px;
      background-image: none;
      padding: 5px;
    }
  }
}
</style>