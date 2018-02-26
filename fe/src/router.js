import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Chat from './views/Chat.vue'
import User from './views/User.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireLogin: true,
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/about',
          name: 'about',
          component: About,
        },
        {
          path: '/chat',
          name: 'chat',
          component: Chat,
        },
        {
          path: '/user',
          name: 'user',
          component: User,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    !window.localStorage.getItem('fue-jwt')
  ) {
    next('/login')
  } else {
    next()
  }
})

export default router
