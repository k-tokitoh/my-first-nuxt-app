<template>
  <amplify-authenticator>
    <h1>dashboard</h1>
    <p>hello, {{ name }}</p>
  </amplify-authenticator>
</template>

<script lang="ts">
import Vue from 'vue'
import { Auth } from 'aws-amplify'

export default Vue.extend({
  data() {
    return { name: Auth.userAttributes.name }
  },
})
</script>
