import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathers from './feathers'

import uiModule from '@/store/modules/ui'

const { service, auth, FeathersVuex } = feathersVuex(feathers, {
  idField: '_id',
})

Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  modules: {
    ui: uiModule,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    auth({ userService: 'users' }),

    service('users', {
      replaceItems: true,
      instanceDefaults: {
        name: '',
        email: '',
        password: undefined,
        roles: [],
      },
    }),

    service('messages'),
  ],
  strict: process.env.NODE_ENV !== 'production',
})
