import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathers from '@/api/feathers'
import ui from '@/store/modules/ui'

const { service, auth } = feathersVuex(feathers, { idField: '_id' })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    auth({ userService: 'users' }),
    service('users'),
    service('messages'),
  ],
  strict: process.env.NODE_ENV !== 'production',
})
