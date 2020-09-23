import Vue from 'vue'
import Router from 'vue-router'
import main from '@/pages/main/index'
import admin from '@/pages/admin/index'
import list from '@/pages/admin/list'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },{
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]


})
