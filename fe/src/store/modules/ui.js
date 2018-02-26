const state = {
  menus: [
    { icon: 'home', title: 'Home', to: '/home', auth: ['*'] },
    { icon: 'pets', title: 'About', to: '/about', auth: ['*'] },
    { icon: 'chat', title: 'Chat', to: '/chat', auth: ['*'] },
    { icon: 'face', title: 'User', to: '/user', auth: ['ADMIN'] },
  ],
  snackbar: {
    toggle: false,
    message: '',
  },
  roles: ['ADMIN', 'GUEST'],
}

// mutations
const mutations = {
  toggleSnackbar(state, { message }) {
    state.snackbar = {
      toggle: !state.snackbar.toggle,
      message,
    }
  },
}

export default {
  state,
  mutations,
}
