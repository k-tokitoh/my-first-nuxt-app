<template>
  <v-parallax
    dark
    :src="require('@/assets/index.jpg')"
    id="parallax"
    height="100%"
  >
    <v-container>
      <h1>My First Nuxt App</h1>
      <div>Current time is {{ current.toLocaleString() }}</div>
      <div>You visited this page at {{ visitedAt.toLocaleString() }}</div>
      <div>This page is generated at {{ generatedAt.toLocaleString() }}</div>
      <Counter />
      <LoremIpsum />
    </v-container>
  </v-parallax>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      current: new Date(),
      visitedAt: new Date(),
      generatedAt: new Date(),
    }
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
