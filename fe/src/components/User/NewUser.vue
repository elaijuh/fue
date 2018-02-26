<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Create user</span>
      </v-card-title>
      <v-card-text>
        <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Email" v-model="user.email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
            <v-text-field label="Password" type="password" v-model="user.password" required></v-text-field>
            </v-flex>
            <v-flex xs12>
            <v-text-field
              label="Confirm password"
              type="password"
              v-model="confirmPassword"
              :rules="[value => ( user.password == value || 'Invalid password')]"
              required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                label="Role"
                autocomplete
                multiple
                chips
                v-model="user.roles"
                :items="roles"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="primary" flat @click.native="createUser">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import globalMixin from '@/mixins/global'

export default {
  mixins: [globalMixin],
  data() {
    return {
      dialog: false,
      confirmPassword: undefined,
      user: {},
    }
  },
  props: ['w'],
  computed: {
    ...mapState({
      roles: state => state.ui.roles,
    }),
  },
  watch: {
    w(val) {
      this.toggleDialog()
    },
  },
  methods: {
    ...mapActions('users', {
      usersCreate: 'create',
    }),

    toggleDialog() {
      this.confirmPassword = undefined
      this.dialog = true
    },

    async createUser() {
      this.errorHandler(this.usersCreate(this.user))
      this.user = {
        roles: [],
      }
      this.dialog = false
    },
  },
}
</script>
