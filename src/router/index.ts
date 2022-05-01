import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabels from "@/views/EditLabels.vue";
import AddTag from '@/views/AddTag.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/money"
  },
  {
    path: "/money",
    component: Money
  },
  {
    path: "/labels",
    component: Labels
  },
  {
    path: "/labels/edit/:id",
    component: EditLabels
  },
  {
    path: "/statistics",
    component: Statistics
  },
  {
    path: "/addTag",
    component: AddTag
  },
  {
    path: "*",
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
