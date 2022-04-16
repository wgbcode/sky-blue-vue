import Vue from 'vue';
import Component from 'vue-class-component';

// 混入，分发 Vue 组件中可复用的功能
@Component
export default class TagHelper extends Vue {
    createTag() {
        const name = window.prompt('请输入标签名');
        this.$store.commit('createTag', name);
    }
}