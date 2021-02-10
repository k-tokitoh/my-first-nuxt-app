<template>
  <v-container class="mt-xl-6 mt-lg-4 mt-md-2 mt-1">
    <v-row>
      <v-col
        v-for="(id, index) in ids"
        :key="`${id}-${index}`"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-img
          :src="`https://picsum.photos/id/${id}/450`"
          :lazy-src="`https://picsum.photos/id/${id}/8`"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <div class="fill-height d-flex align-center justify-center">
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <div v-if="loading" class="d-flex justify-center pa-16">
      <v-progress-circular
        size="128"
        indeterminate
        color="grey"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  ids: Array<number>
  loading: boolean
}

export default Vue.extend({
  data(): Data {
    return {
      ids: [],
      loading: false,
    }
  },
  async mounted() {
    this.addIds()
    window.onscroll = () => {
      const closeToBottom =
        document.documentElement.offsetHeight - 256 <=
        document.documentElement.scrollTop + window.innerHeight
      if (!this.loading && closeToBottom) {
        this.addIds()
      }
    }
  },
  methods: {
    async addIds() {
      this.loading = true
      const page = Math.ceil(Math.random() * 64)
      const res: Array<{ id: number }> = await this.$axios.$get(
        `https://picsum.photos/v2/list?page=${page}&limit=12`
      )
      const ids = res.map((photo) => photo.id)
      this.ids.push(...ids)
      this.loading = false
    },
  },
})
</script>
