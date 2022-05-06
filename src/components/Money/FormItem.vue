<template>
  <div>
    <label class="formItem">
      <div class="dateInputWrapper" v-if="type === 'date'">
        <span class="dateName">{{ this.fieldName }}</span>
        <input
          :type="type || 'text'"
          :value="changeDateStyle(value)"
          @input="onValueChanged($event.target.value)"
          class="dateInput"
          min="2015-01-31"
          max="2025-12-31"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        />
      </div>
      <div class="monthInputWrapper" v-else-if="type === 'month'">
        <input
          :type="type || 'text'"
          :value="value"
          @input="onValueChanged($event.target.value)"
          class="monthInput"
          min="2015-01"
          max="2025-12"
          pattern="[0-9]{4}-[0-9]{2}"
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
  changeDateStyle(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.formItem {
  font-size: 14px;
  display: flex;
  align-items: center;
  background: white;
  .textName {
    padding: 0 16px;
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

  .dateInputWrapper {
    margin: 15px 0 5px 0;
    .dateName {
      padding: 0 16px;
      font-family: $font-hei;
    }
    .dateInput {
      width: 100px;
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
      width: 90px;
      background-image: none;
      padding: 5px;
    }
  }

  .monthInputWrapper {
    background: #49ad95;
    padding: 35px 0 15px 0;
    border: none;
    color: white;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    .monthInput {
      font-size: 18px;
      position: relative;
      background: #49ad95;
      border: none;
      color: white;
      display: flex;
      width: 120px;
      justify-content: center;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>