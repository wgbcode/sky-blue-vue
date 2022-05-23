<template>
  <div>
    <header class="tagTitle">
      <button @click="goBack">取消</button>
      <div>
        {{ "新增" + [selectedType === "-" ? "支出" : "收入"] + "类型" }}
      </div>
      <button @click="createTag(tag)">保存</button>
    </header>
    <FormItem
      fieldName="标签名"
      placeholder="请输入标签名称"
      class="inputTagName"
      :value.sync="tag.name"
    />
    <div class="iconType">
      <div class="iconTitle">类别图标</div>
      <div class="iconList">
        <Icon
          v-for="iconName in iconNameList"
          :name="iconName"
          :class="{ selected: selectedIconName.indexOf(iconName) >= 0 }"
          @click="getIconName(iconName)"
          :key="iconName"
        />
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import addClass from "@/lib/addClass";
import TagHelper from "@/mixins/TagHelper";
import { Component, Mixins } from "vue-property-decorator";

@Component
export default class AddTag extends Mixins(TagHelper) {
  selectedIconName: any = [];
  tag: Tag = {
    id: "",
    name: "",
    icon: "",
    type: "",
  };
  get iconNameList() {
    return this.$store.state.iconNameList;
  }
  get selectedType() {
    return this.$store.state.selectedType;
  }
  goBack() {
    this.$router.back();
    this.$store.commit("showTags");
  }
  getIconName(iconName: string) {
    addClass(iconName, this.selectedIconName);
    this.tag.icon = iconName;
  }
}
</script>

<style lang='scss' scoped>
.tagTitle {
  display: flex;
  justify-content: space-between;
  background: #49ad95;
  padding: 24px 16px;
  color: white;
  font-size: 16px;
  line-height: 1.2;
  button {
    border: none;
    background: transparent;
    color: white;
  }
  button:focus {
    outline: none;
  }
}
.inputTagName {
  background: white;
  padding: 10px 0px;
}
.iconType {
  background: white;
  color: #b0b0b0;
  margin-top: 20px;
  .iconTitle {
    text-align: center;
    padding: 20px 0;
  }
  .iconList {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .icon {
      height: 35px;
      width: 35px;
      margin: 10px 20px;
      background: #f6f6f6;
      border-radius: 20px;
    }
    .selected {
      background: #49ad95;
    }
    i {
      width: 35px;
      margin: 20px;
    }
  }
}
</style>