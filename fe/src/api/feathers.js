import Vue from 'vue'
// import VueFeathers from 'vue-feathers'
import io from 'socket.io-client'
import Feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const socket = io(process.env.VUE_APP_HOST || 'http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true,
})

const feathers = Feathers()
  .configure(socketio(socket))
  .configure(
    authentication({
      storageKey: 'fue-jwt',
      storage: window.localStorage,
    }),
  )

// Vue.use(VueFeathers, feathers)

export default feathers
