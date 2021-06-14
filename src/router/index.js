import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.path === "/login") {
  //   next();
  //   return;
  // }
  // let sessionId = localStorage.getItem("sessionId")
  // console.log("sessionId" + sessionId)
  // if (!sessionId) {
  //   next({
  //     path: '/login',
  //   })
  // } else {
  //   next()
  // }
  next()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title || process.env.VUE_APP_TITLE
  window.scroll(0, 0)
})

export default router
