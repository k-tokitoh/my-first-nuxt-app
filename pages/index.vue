<template>
  <v-container>
    <h1>My First Nuxt App</h1>
    <div><NuxtLink to="/gallery">gallery</NuxtLink></div>
    <div>Current time is {{ current.toLocaleString() }}</div>
    <div>You visited this page at {{ visitedAt.toLocaleString() }}</div>
    <div>This page is generated at {{ generatedAt.toLocaleString() }}</div>
    <Counter />
    <div class="foo"></div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData() {
    return { generatedAt: new Date() }
  },
  data() {
    return { visitedAt: new Date(), current: new Date() }
  },
  methods: {
    updateCurrent() {
      this.current = new Date()
    },
  },
  mounted() {
    setInterval(this.updateCurrent, 1000)
  },
})
</script>

<style>
.foo {
  background-color: red;
  height: 3000px;
}
</style>
