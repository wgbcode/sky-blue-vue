import ButtonStyle from "@/components/ButtonStyle.vue";
import Icon from "@/components/Icon.vue";
import Layout from "@/components/Layout.vue";
import FormItem from "@/components/FormItem.vue";
import Tab from "@/components/Tab.vue";
import Nav from "@/components/Nav.vue";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);
Vue.component("ButtonStyle", ButtonStyle);
Vue.component("FormItem", FormItem);
Vue.component("Tab", Tab);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};
