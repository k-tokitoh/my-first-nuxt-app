<template>
  <amplify-authenticator username-alias="email">
    <h1>dashboard</h1>
    <p>email: {{ currentUser && currentUser.attributes.email }}</p>
    <button v-if="currentUser" @click="logOut">log out</button>
  </amplify-authenticator>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Auth } from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default Vue.extend({
  created() {
    onAuthUIStateChange(() => {
      this.$store.dispatch('fetchCurrentUser')
    })
  },
  computed: mapState(['currentUser']),
  methods: {
    async logOut() {
      Auth.signOut().then(() => this.$router.push('/'))
    },
  },
})
</script>
