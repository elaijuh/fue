import to from 'await-to-js'

export default {
  methods: {
    async errorHandler(p) {
      let res, err
      ;[err, res] = await to(p)
      if (err) {
        this.$store.commit('toggleSnackbar', { message: err.message })
      }
    },
  },
}
