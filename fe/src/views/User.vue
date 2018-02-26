<template>
  <v-container fluid grid-list-md>

    <v-layout row wrap mb-3>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-layout>

    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      :items="users"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm12
        md12
        lg12
        xl12
      >
        <v-card>
          <v-card-title><h4>{{ props.item.email }}</h4>
            <v-spacer></v-spacer>
            <v-btn icon small class="mx-0 my-0" @click.native.stop="toggleEditUser(props.item)">
              <v-icon small>mode_edit</v-icon>
            </v-btn>
            <v-menu bottom left offset-y>
              <v-btn icon small class="mx-0 my-0" slot="activator">
                <v-icon small>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="">
                  <v-list-tile-action>
                    <v-icon small>not_interested</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title class="body-1">Block</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="deleteUser(props.item)">
                  <v-list-tile-action>
                    <v-icon small>delete</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title class="body-1">Delete</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
					</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Roles:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.roles }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Create time:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.createdAt }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <v-layout row justify-center>
      <create-user :w="createUserFlag"></create-user>
      <edit-user :w="editUserFlag" :d="user"></edit-user>
    </v-layout>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="accent"
      @click.native.stop="createUserFlag = !createUserFlag"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import to from 'await-to-js'
import globalMixin from '@/mixins/global'
import EditUser from '@/components/User/EditUser.vue'
import CreateUser from '@/components/User/NewUser.vue'

export default {
  name: 'user',
  mixins: [globalMixin],
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
      search: '',
      user: {},
      createUserFlag: false,
      editUserFlag: false,
    }
  },
  components: {
    'create-user': CreateUser,
    'edit-user': EditUser,
  },
  computed: {
    ...mapGetters('users', {
      users: 'list',
    }),
  },
  methods: {
    ...mapActions('users', {
      usersPatch: 'patch',
      usersCreate: 'create',
      usersDelete: 'remove',
      usersFind: 'find',
    }),

    toggleEditUser(user) {
      this.user = {
        _id: user._id,
        email: user.email,
        roles: user.roles.slice(),
      }
      this.editUserFlag = !this.editUserFlag
    },

    deleteUser(user) {
      this.errorHandler(this.usersDelete(user._id))
    },
  },

  async created() {
    let res, err
    ;[err, res] = await to(this.usersFind({}))
    if (err) {
      this.$store.commit('toggleSnackbar', { message: err.message })
    }
  },
}
</script>
