import Vue from 'vue'
import Router from 'vue-router'
import { bxAnaalyse } from '@/core/icons'

import { UserLayout, BasicLayout } from '@/layouts'
export const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}
export const constantRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: 'home' },
  redirect: '/dashboard/workplace',
  children: [
    // dashboard
    {
      path: 'dashboard',
      name: 'dashboard',
      redirect: '/dashboard/workplace',
      component: RouteView,
      meta: {
        title: 'dashboard',
        keepAlive: true,
        icon: bxAnaalyse
      },
      children: [
        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('@/views/dashboard/Analysis'),
          meta: {
            title: '分析',
            keepAlive: false
          }
        },
        {
          path: 'workplace',
          name: 'workplace',
          component: () => import('@/views/dashboard/Workplace'),
          meta: {
            title: '工作',
            keepAlive: true
          }
        }
      ]
    },
    // Exception
    {
      path: 'exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      meta: { title: '异常页', icon: 'warning' },
      children: [
        {
          path: '403',
          name: '403',
          component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
          meta: { title: '403' }
        },
        {
          path: '404',
          name: '404',
          component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
          meta: { title: '404' }
        },
        {
          path: '500',
          name: '500',
          component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
          meta: { title: '500' }
        }
      ]
    }
  ]
}]
const defalutRouterMap = [{
  path: '/user',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [
    {
      path: 'login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/user/Login')
    },
    {
      path: 'register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/user/Register')
    },
    {
      path: 'register-result',
      name: 'registerResult',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
    },
    {
      path: 'recover',
      name: 'recover',
      component: undefined
    }
  ]
},
{
  path: '/404',
  component: () =>
    import(/* webpackChunkName: "fail" */ '@/views/exception/404')
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}]
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...constantRouterMap,
    ...defalutRouterMap
  ]
})
