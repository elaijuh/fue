# FUE

SPA boilerplate with [FeathersJS](https://feathersjs.com/) as backend and [Vue.js](https://vuejs.org/) as frontend, stylished by [Vuetify](https://vuetifyjs.com/en/)

- Campatible with @feathersjs/cli and @vue/cli
- Server side authentication by local and JWT
- Server side authorization with [casl](https://github.com/stalniy/casl)
- Client side authorization (UI visibility)
- Client side feathers-vuex integrated

### TODO

- Online demo
- Docker

### Development

Start mongo service

`docker run -d -p 27017:27017 -v ~/docker/data/db:/data/db --rm mongo:4.0`

Start frontend server

`make start-client`

Start backend server

`make start-server`

### Build

Build frontend

`make build`
