<template>
  <v-app-bar app :height="height">
    <v-app-bar-nav-icon>
      <NuxtLink to="/"><AppLogo /></NuxtLink>
    </v-app-bar-nav-icon>
    <ul id="nav">
      <li><NuxtLink to="/">top</NuxtLink></li>
      <li><NuxtLink to="/gallery">gallery</NuxtLink></li>
      <li><NuxtLink to="/square">square</NuxtLink></li>
      <li>
        <NuxtLink to="/dashboard">{{
          currentUser ? 'dashboard' : 'login'
        }}</NuxtLink>
      </li>
    </ul>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export const height: number = 64

export default Vue.extend({
  data() {
    return { height: height }
  },
  computed: mapState(['currentUser']),
})
</script>

<style scoped>
#nav {
  display: flex;
  padding: 10px;
}

#nav li {
  width: 8vw;
  text-align: center;
}

#nav li a {
  color: #000;
}
</style>
