const state = {
  navigationMenu: [
    { action: 'mdi-home', title: 'Home', to: '/home', auth: ['*'] },
    { action: 'mdi-panda', title: 'About', to: '/about', auth: ['*'] },
    {
      action: 'mdi-message-text-outline',
      title: 'Chat',
      to: '/chat',
      auth: ['*'],
    },
    {
      action: 'mdi-account-multiple',
      title: 'User',
      to: '/users',
      auth: ['ADMIN'],
    },
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
  namespaced: true,
  state,
  mutations,
}
