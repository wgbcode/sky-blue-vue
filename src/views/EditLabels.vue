<template>
  <div>
    <div class="topBar">
      <Icon name="left" @click="goBack" />
      <span>编辑标签</span>
      <Icon />
    </div>
    <div class="form-wrapper">
      <FormItem
        field-name="标签名"
        placeholder="请输入标签名"
        :value="tag.name"
        @update:value="update"
      />
    </div>
    <ButtonStyle @click="remove"><slot>删除标签</slot></ButtonStyle>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditLabels extends Vue {
  tag?: { id: string; name: string } = undefined;
  created() {
    let id = this.$route.params.id;
    this.tag = window.findTag(id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  goBack() {
    this.$router.back();
  }
  update(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      window.removeTag(this.tag.id);
      this.goBack();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.topBar {
  font-family: $font-hei;
  font-size: 20px;
  line-height: 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 16px 16px;
  .icon {
    height: 20px;
    width: 20px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
</style>