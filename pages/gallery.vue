<template>
  <v-container class="mt-xl-6 mt-lg-4 mt-md-2 mt-1">
    <v-row>
      <v-col v-for="id in ids" :key="id" sm="6" md="4" xl="3">
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Http from '@nuxt/http'

const shuffle = (array: Array<any>) => {
  for (var i = array.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1))
    var tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}

export default Vue.extend({
  components: { Http },
  async asyncData({ $http }) {
    const res: Array<any> = await $http.$get(
      'https://picsum.photos/v2/list?limit=12'
    )
    const ids = shuffle(res.map((photo) => photo.id))
    return { ids }
  },
})
</script>
