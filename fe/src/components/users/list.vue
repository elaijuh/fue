<template lang="pug">
v-container(fluid)
  v-layout
    v-flex(xs12)
      v-card
        v-toolbar(flat)
          v-toolbar-title Users
          v-spacer
          v-btn(color="primary", @click="create") create new user
          UserEdit(v-if="dialog",
            :id="editUserId",
            :dialog="dialog",
            v-on:update:dialog="dialog = false")
        v-card-title Users
          v-spacer
          v-text-field(v-model="search", append-icon="mdi-magnify", label="Search", single-line, hide-details)
        v-data-table(:headers="headers", :items="items", :search="search", :rows-per-page-items="[10, 25, 50]")
          template(slot="items", slot-scope="props")
            td {{props.item._id}}
            td {{props.item.name}}
            td {{props.item.email}}
            td {{props.item.roles}}
            td {{props.item.createdAt}}
            td.justify-center.layout.mx-0
              v-icon.mr-2(small, @click="edit(props.item)") mdi-pencil
              v-icon(small, @click="remove(props.item)") mdi-delete
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserEdit from './edit.vue'

export default {
  name: 'users-list',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Roles',
          value: 'roles',
        },
        {
          text: 'Created At',
          value: 'createdAt',
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false,
        },
      ],
      dialog: false,
      editUserId: null,
    }
  },
  components: {
    UserEdit,
  },
  computed: {
    ...mapGetters({
      findUsersStore: 'users/find',
    }),
    items() {
      let users = this.findUsersStore()
      return users.data
    },
  },
  methods: {
    ...mapActions({
      findUsers: 'users/find',
      removeUsers: 'users/remove',
    }),

    create() {
      this.editUserId = null
      this.dialog = true
    },

    edit(user) {
      this.editUserId = user._id
      this.dialog = true
    },

    remove(user) {
      this.removeUsers(user._id)
    },
  },
  created() {
    this.findUsers()
  },
}
</script>
