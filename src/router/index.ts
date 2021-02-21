import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import statistics from '@/views/Statistics.vue'
import EditLabel from '@/views/EditLabel.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/money'
  },

  {
    path:'/money',
    component:Money
  },
  {
    path:'/labels',
    component:Labels
  },
  {
    path:'/statistics',
    component:statistics
  },
  {
    path:'/labels/edit/:id',
    component:EditLabel
  },
  {
    path:'*',
    component:NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
