// import Vue from 'vue'
// import VueFeathers from 'vue-feathers'
import io from 'socket.io-client'
import Feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const socket = io(undefined, {
  transports: ['websocket'],
  forceNew: true,
})

const feathers = Feathers()
  .configure(socketio(socket, { timeout: 30000 }))
  .configure(
    authentication({
      storageKey: 'fue-jwt',
      storage: window.localStorage,
    })
  )

// Vue.use(VueFeathers, feathers)

export default feathers
