<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="countUp">count up</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return { count: 0 }
  },
  methods: {
    countUp() {
      this.count += 1
    },
  },
})
</script>
