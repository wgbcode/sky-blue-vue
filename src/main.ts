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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
