<template>
  <div>
    <v-divider :key="`divider-${comment.id}`" />
    <v-list-item :key="`list-item-${comment.id}`">
      <v-list-item-content>{{ comment.body }}</v-list-item-content>
      <v-list-item-action-text :key="comment.id">
        {{ new Date(comment.createdAt).toLocaleString() }}
      </v-list-item-action-text>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['comment', 'scroll'],
  mounted() {
    if (!!scroll) {
      this.$el.scrollIntoView({ behavior: 'smooth' })
    }
  },
})
</script>
