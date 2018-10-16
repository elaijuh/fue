import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Chat from './views/Chat.vue'
// import User from './views/User.vue'
import Users from './components/users/list.vue'
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
          path: '/users',
          name: 'user',
          component: Users,
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

router.beforeEach((t, f, next) => {
  if (t.matched.some(record => record.meta.requireLogin)) {
    if (!store.state.auth.accessToken) {
      store
        .dispatch('auth/authenticate')
        .then(res => {
          next()
        })
        .catch(err => {
          console.log(err)
          next('/login')
        })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
