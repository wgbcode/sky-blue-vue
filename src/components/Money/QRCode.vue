<template>
  <div :class="{ wrapperQRCode: clientWidth > 500 }">
    <img class="QRCode" src="../../../public/qrcode.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QRCode extends Vue {
  clientWidth = 0;
  created() {
    this.clientWidth = document.body.clientWidth;
    if (this.clientWidth > 500) {
      alert("为保证浏览效果，请使用手机浏览本页面！");
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapperQRCode {
  position: fixed;
  height: 100vh;
  width: 100%;
  opacity: 0.75;
  background: black;
  .QRCode {
    width: 350px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>