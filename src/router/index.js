import Vue from 'vue'
import Router from 'vue-router'

import { UserLayout, BasicLayout } from '@/layouts'
export const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index'),
        meta: {
          title: '主页',
          keepAlive: true,
          icon: 'home'
        }
      },
      // publish
      {
        path: '/publish',
        name: 'publish',
        component: RouteView,
        redirect: '/publish/index',
        meta: { title: '创作', icon: 'edit' },
        children: [
          {
            path: '/publish/index',
            name: 'publishIndex',
            component: () =>
              import(/* webpackChunkName: "publishIndex" */ '@/views/publish/Index'),
            meta: { title: '发布文章' }
          },
          {
            path: '/publish/video',
            name: 'publishVideo',
            component: () =>
              import(/* webpackChunkName: "publishVideo" */ '@/views/publish/Video'),
            meta: { title: '发布视频' }
          },
          {
            path: '/publish/question',
            name: 'publishQuestion',
            component: () =>
              import(/* webpackChunkName: "publishQuestion" */ '@/views/publish/question/Index'),
            meta: { title: '发布问答' }
          }
        ]
      },
      // works
      {
        path: '/manage',
        name: 'manage',
        component: RouteView,
        redirect: '/manage/works/index',
        meta: { title: '管理', icon: 'project' },
        children: [
          {
            path: '/manage/works/index',
            name: 'manageWorks',
            component: () =>
              import(/* webpackChunkName: "manageWork" */ '@/views/manage/works/Index'),
            meta: { title: '作品管理' }
          },
          {
            path: '/manage/comment/index',
            name: 'manageComment',
            component: () =>
              import(/* webpackChunkName: "manageComment" */ '@/views/manage/comment/Index'),
            meta: { title: '评论管理' }
          }
        ]
      },
      // qa
      {
        path: '/publish/publishQuestion',
        name: 'publishPublishQuestion',
        component: () => import('@/views/publish/question/PublishQuestion'),
        meta: {
          title: '发布',
          keepAlive: true,
          icon: 'edit',
          hidden: true
        }
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', hidden: true },
        children: [
          {
            path: '/exception/403',
            name: '403',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403' }
          },
          {
            path: '/exception/404',
            name: '404',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404' }
          },
          {
            path: '/exception/500',
            name: '500',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500' }
          }
        ]
      },
      // setting
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/Index'),
        meta: {
          title: '设置',
          keepAlive: true,
          icon: 'setting'
        }
      }
    ]
  }
]
const defalutRouterMap = [
  {
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
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/setting',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [...constantRouterMap, ...defalutRouterMap]
})
