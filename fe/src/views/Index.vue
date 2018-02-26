<template>
	<v-app light>

		<v-navigation-drawer
			fixed
			app
      :mini-variant="miniVariant"
			v-model="drawer"
		>
			<v-list>
        <v-list-tile 
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
			</v-list>
    </v-navigation-drawer>

    <v-toolbar
      color="primary"
      dark
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn 
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu bottom left>
        <v-btn
          icon
          slot="activator"
        >
          <v-icon>person</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile  @click="toggleMe = !toggleMe">
            <v-list-tile-title>My Account</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  @click="signout()">
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <v-container>
		    <router-view/>
      </v-container>
    </v-content>

    <v-navigation-drawer
      temporary
      right
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>info</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Po just called you</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>info</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Da wants lollipop</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <me :w="toggleMe" :d="me"></me>
    <v-snackbar
      :timeout="3000"
      top
      v-model="snackbar"
    >
      {{ message }}
      <v-btn flat color="accent" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

	</v-app>
</template>
            
<script>
import { mapState, mapActions } from 'vuex'
import store from '@/store'
import to from 'await-to-js'
import EditUser from '@/components/User/EditUser.vue'

export default {
  data() {
    return {
      drawer: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'fue',
      snackbar: false,
      toggleMe: false,
    }
  },
  components: {
    me: EditUser,
  },
  computed: {
    ...mapState({
      uiSnackbar: state => state.ui.snackbar.toggle,
      message: state => state.ui.snackbar.message,
      items: state => {
        let roles = state.auth.user.roles
        return state.ui.menus.filter(m => {
          for (let auth of m.auth) {
            if (roles.indexOf(auth) != -1 || auth === '*') {
              return true
            }
          }

          return false
        })
      },
      accessToken: state => state.auth.accessToken,
      me: state => state.auth.user,
    }),
  },
  watch: {
    uiSnackbar(val) {
      this.snackbar = true
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    signout() {
      this.logout()
      this.$router.push('/login')
    },
  },
  async beforeRouteEnter(t, f, next) {
    let res, err
    if (!store.state.auth.accessToken) {
      ;[err, res] = await to(store.dispatch('auth/authenticate'))
      if (err) {
        next('/login')
      } else {
        next()
      }
    }
    next()
  },
}
</script>
