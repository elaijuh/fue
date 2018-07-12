<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Edit user</span>
      </v-card-title>
      <v-card-text>
        <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Email" v-model="user.email" disabled></v-text-field>
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
              <v-autocomplete
                label="Role"
                multiple
                chips
                v-model="user.roles"
                :items="roles"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="primary" flat @click.native="editUser">Save</v-btn>
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
  props: ['w', 'd'],
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
      usersPatch: 'patch',
    }),

    toggleDialog() {
      this.user = {
        _id: this.d._id,
        email: this.d.email,
        roles: this.d.roles.slice(),
      }
      this.confirmPassword = undefined
      this.dialog = true
    },

    async editUser() {
      delete this.user.email
      this.errorHandler(this.usersPatch([this.user._id, this.user]))
      this.dialog = false
    },
  },
}
</script>
