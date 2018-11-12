import Vue from 'vue'
import Router from 'vue-router'
import Write from './pages/common/Write.vue'
import Home from './pages/Home.vue'
import Review from './pages/Review.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/review',
      component: Review
    },
    // {
    //   path: '/debug',
    //   component: Write
    // },
    {
      path: '/class1',
      component: () => import(/* webpackChunkName: "class1" */ './pages/class1/Home.vue'),
    },
    {
      path: '/class1/listen',
      component: () => import(/* webpackChunkName: "class1" */ './pages/class1/Listen.vue'),
    },
    {
      path: '/class2',
      component: () => import(/* webpackChunkName: "class2" */ './pages/class2/Home.vue'),
      children: [
        // {
        //   path: 'posts',
        //   component: UserPosts
        // }
      ]
    },
    {
      path: '/class3',
      component: () => import(/* webpackChunkName: "class3" */ './pages/class3/Home.vue'),
      children: [
        // {
        //   path: 'posts',
        //   component: UserPosts
        // }
      ]
    },
  ]
})


//todo 拦截所有未加载路由
