<template>
  <div :class="classPrefix ? [classPrefix] + '-tabWrapper' : 'tabWrapper'">
    <ul :class="classPrefix ? [classPrefix] + '-tab' : 'tab'">
      <li
        v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        :class="liClass(item)"
      >
        <span>{{ item.text }} </span>
        <span
          v-show="classPrefix ? true : false"
          :class="item.value === '-' ? 'outSum' : 'inSum'"
        >
          {{ getTotal(item) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import sum from "@/lib/sum";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tab extends Vue {
  @Prop({ required: true, type: Array }) readonly dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) readonly classPrefix?: string;
  @Prop(Array) readonly monthRecordList?: RecordItem[];
  sum = sum;
  get selectedType() {
    return this.$store.state.selectedType;
  }
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-li"]: this.classPrefix,
      selected: item.value === this.selectedType,
    };
  }
  select(item: DataSourceItem) {
    this.$store.commit("createSelectedType", item.value);
    this.$store.commit("fetchSelectedType");
    this.$store.commit("showTags");
    this.$emit("click");
  }
  getTotal(item: any) {
    let total;
    let selectedTotal;
    if (this.monthRecordList) {
      total = sum(this.monthRecordList.filter((r) => r.type === item.value));
      selectedTotal = sum(
        this.monthRecordList.filter((r) => r.type === this.selectedType)
      );
    } else {
      total = "0.00";
    }
    this.$emit("update:total", selectedTotal);
    return total;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabWrapper {
  background: #49ad95;
  .tab {
    font-size: 16px;
    line-height: 22px;
    font-family: $font-hei;
    display: flex;
    justify-content: center;
    padding: 30px 0 15px 0;
    li {
      border: 1px solid white;
      padding: 3px 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      &.selected {
        background: white;
        color: #49ad95;
      }
    }
  }
}
</style>