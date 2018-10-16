<template lang="pug">
v-app
  v-content
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          v-card.elevation-12
            v-toolbar(dark, color="primary")
              v-toolbar-title Login form
            v-card-text
              v-form
                v-text-field(prepend-icon="mdi-account", name="email", label="Account", type="text", v-model="email", autocomplete="account")
                v-text-field(prepend-icon="mdi-lock", name="password", label="Password", type="password", v-model="password", autocomplete="current-password", @keyup.enter="login(email, password)")
            v-card-actions
              v-spacer
              v-btn(color="primary" @click="login(email, password)") Login
    v-snackbar(:timeout="3000", top, v-model="snackbar")
      span {{message}}
      v-btn(flat, color="accent", @click.native="snackbar=false")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import to from 'await-to-js'

export default {
  data: () => ({
    email: undefined,
    password: undefined,
    error: undefined,
    snackbar: false,
  }),
  computed: {
    ...mapState({
      uiSnackbar: state => state.ui.snackbar.toggle,
      message: state => state.ui.snackbar.message,
    }),
  },
  watch: {
    uiSnackbar() {
      this.snackbar = true
    },
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login(email, password) {
      let res, err
      ;[err, res] = await to(
        this.authenticate({ strategy: 'local', email, password })
      )
      if (err) {
        this.$store.commit('toggleSnackbar', { message: err.message })
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>
