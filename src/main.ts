import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from "@/components/Layout.vue"
import Icon from "@/components/Icon.vue"
import ButtonStyle from "@/components/ButtonStyle.vue"
import FormItem from "@/components/Money/FormItem.vue"
import tagListModel from "@/models/tagListModel"

Vue.config.productionTip = false

Vue.component("Nav", Nav)
Vue.component("Layout", Layout)
Vue.component("Icon", Icon)
Vue.component("ButtonStyle", ButtonStyle)
Vue.component("FormItem", FormItem)

window.tagList = tagListModel.fetch()
window.createTag = (name: string) => {
  if (name) {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
      window.alert("标签名重复了");
    } else if (message === "success") {
      window.alert("添加成功");
    }
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
