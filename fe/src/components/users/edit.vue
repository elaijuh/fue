<template lang="pug">
v-dialog(:value="dialog", max-width="500px", persistent)
  v-card
    v-card-title
      span.title {{title}}
    v-card-text
      v-form(v-if="isCreate", v-model="formValid", ref="form", lazy-validation)
        v-container(grid-list-sm)
          v-layout(wrap)
            v-flex(xs12)
              v-text-field(v-model="user.email", label="Email", :rules="emailRules", required)
            v-flex(xs12)
              v-text-field(v-model="user.name", label="Name")
            v-flex(xs12)
              v-text-field(v-model="user.password", label="Password", type="password", :rules="passwordRules", required)
            v-flex(xs12)
              v-text-field(v-model="confirmPassword", label="Confirm password", type="password", :rules="confirmPasswordRules")
            v-flex(xs12)
              v-autocomplete(v-model="user.roles", label="Roles", :items="roles", small-chips, deletable-chips, multiple, dense, required)
      v-form(v-else, ref="form", v-model="formValid", lazy-validation)
        v-container(grid-list-sm)
          v-layout(wrap)
            v-flex(xs12)
              v-text-field(v-model="user.email", label="Email", :rules="emailRules", disabled)
            v-flex(xs12)
              v-text-field(v-model="user.name", label="Name")
            v-flex(xs12)
              v-text-field(v-model="user.password", label="Password", type="password", :rules="updatePasswordRules")
            v-flex(v-if="" ,xs12)
              v-autocomplete(v-model="user.roles", label="Roles", :items="roles", small-chips, deletable-chips, multiple, dense, required)
            
    v-card-actions
      v-spacer
      v-btn(flat, v-if="isCreate", color="primary", @click="create()", :disabled="!formValid") Create
      v-btn(flat, v-else, color="primary", @click="update()", :disabled="!formValid") Save
      v-btn(flat, @click="close()") Close

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { clone, contains } from 'ramda'

export default {
  name: 'users-edit',
  data() {
    return {
      formValid: false,
      emailRules: [
        v => !!v || 'Email is required',
        // v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v && v.length >= 6) || 'Password must be longer than 6 characters',
      ],
      updatePasswordRules: [
        v => {
          if (!v) {
            return true
          } else {
            return v.length >= 6 || 'Password must be longer than 6 characters'
          }
        },
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.user.password || 'Must be same as password',
        v => v.length >= 6 || 'Password must be longer than 6 characters',
      ],
      user: {},
      confirmPassword: '',
    }
  },
  props: ['dialog', 'id'],
  computed: {
    ...mapState({
      me: state => state.auth.user,
      roles: state => state.ui.roles,
    }),
    ...mapGetters({
      getUsersStore: 'users/get',
    }),
    isAdmin() {
      return contains('admin', this.me.roles)
    },
    isCreate() {
      return !this.id
    },
    title() {
      if (this.isCreate) {
        return 'New user'
      } else {
        return 'Edit user'
      }
    },
  },
  methods: {
    ...mapActions({
      patchUsers: 'users/patch',
    }),
    create() {
      if (this.$refs.form.validate()) {
        this.user.create()
        this.$emit('update:dialog', false)
      }
    },
    async update() {
      if (this.$refs.form.validate()) {
        // this.user.save()
        this.patchUsers([this.user._id, this.user])
        this.$emit('update:dialog', false)
      }
    },
    close() {
      this.$emit('update:dialog', false)
    },
  },

  async created() {
    const { User } = this.$FeathersVuex
    if (!this.id) {
      this.user = new User()
    } else {
      this.user = clone(this.getUsersStore(this.id))
    }
    console.log(this.user)
  },
  destroyed() {},
}
</script>
