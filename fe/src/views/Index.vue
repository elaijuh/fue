<template lang="pug">
v-app
  v-navigation-drawer(fixed, clipped, dark, app, permanent,
    :mini-variant.sync="mini",
    width="200",
    v-model="drawer",
  )
    v-list(dense)
      template(v-for="(m, i) in menu")
        v-subheader.mt-3.grey--text(v-if="m.subheader", :key="i")
          span.i-navigation-subheader {{m.title}}
        v-divider(v-else-if="m.divider", :key="i")
        v-list-group(v-else-if="m.children", :key="i", :prepend-icon="m.action", no-action, active-class="primary--text", v-ripple)
          v-list-tile(slot="activator")
            v-list-tile-content
              v-list-tile-title {{m.title}}
          v-list-tile(v-for="(subm, j) in m.children", :key="j", :to="subm.to", active-class="primary--text")
            v-list-tile-content
              v-list-tile-title {{subm.title}}
        v-list-tile(v-else, :key="i", :to="m.to", exact, active-class="primary--text", v-ripple)
          v-list-tile-action
            v-icon {{m.action}}
          v-list-tile-content
              v-list-tile-title {{m.title}}

  v-toolbar(dense, fixed, clipped-left, app, color="primary")
    v-toolbar-side-icon(@click.stop="mini = !mini")
    v-toolbar-title Creatix
    v-spacer
    span {{me.name || me.email}}
    v-menu(bottom, left)
      v-btn(icon, slot="activator")
        v-icon mdi-account
      v-list
        v-list-tile(@click="dialog=!dialog")
          v-list-tile-title Account
        v-list-tile(@click="signout")
          v-list-tile-title Sign out
    UserEdit(v-if="dialog",
      :id="me._id",
      :dialog="dialog",
      v-on:update:dialog="dialog = false")

  v-content
    router-view

  v-snackbar(:timeout="3000", top, :color="snackbarColor", v-model="snackbar") {{ snackbarMessage }}
    v-btn(icon, flat, dark, @click.native="snackbar = false")
      v-icon(small) mdi-close


</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UserEdit from '@/components/users/edit.vue'

export default {
  name: 'index',
  data() {
    return {
      drawer: true,
      mini: false,
      dialog: false,
      snackbar: false,
    }
  },
  components: {
    UserEdit,
  },
  computed: {
    ...mapState({
      me: state => state.auth.user,
      // sidebar menu
      menu: state => {
        let roles = state.auth.user.roles
        return state.ui.navigationMenu.filter(m => {
          for (let auth of m.auth) {
            if (roles.indexOf(auth) != -1 || auth === '*') {
              return true
            }
          }
          return false
        })
      },
      // snackbar
      snackbarToggle: state => state.ui.snackbar.toggle,
      snackbarMessage: state => state.ui.snackbar.message,
      snackbarColor: state => state.ui.snackbar.color,
    }),

    ...mapGetters({
      findBannersStore: 'banners/find',
    }),
  },

  watch: {
    snackbarToggle() {
      this.snackbar = true
    },
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    signout() {
      this.logout()
      this.$router.push('/login')
    },
  },
  created() {},
}
</script>
<style lang="stylus" scoped>
.i-navigation-subheader
  position relative
  text-transform uppercase

</style>
