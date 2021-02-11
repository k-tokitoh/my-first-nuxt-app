<template>
  <v-form ref="form" @submit.prevent>
    <v-container :style="containerStyle" class="d-flex flex-column">
      <v-row class="flex-grow-1" :style="{ overflow: 'scroll' }" id="scroller">
        <v-col cols="12" class="d-flex flex-column">
          <v-list>
            <template>
              <Comment
                v-for="(comment, index) in comments"
                :key="comment.id"
                :comment="comment"
                :scroll="index - 1 === comments.length"
              />
            </template>
          </v-list>
        </v-col>
      </v-row>
      <v-row class="flex-grow-0">
        <v-col cols="10">
          <v-textarea
            v-model="comment.body"
            outlined
            placeholder="input your comment here!"
            auto-grow
            rows="1"
            :rules="[(v) => !!v]"
            hide-details
          />
        </v-col>
        <v-col cols="2" class="d-flex align-end">
          <v-btn
            type="submit"
            @click="onSubmit"
            id="button"
            color="primary"
            height="54"
          >
            Post
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { API, GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { createComment } from '../graphql/mutations'
import { listCommentsSortedByCreatedAt } from '../graphql/queries'
import {
  CreateCommentMutation,
  ListCommentsSortedByCreatedAtQuery,
} from '../src/API'
import { height as appBarHeight } from '../components/AppBar.vue'

const initialComment = {
  type: 'comment',
  body: undefined,
}

type Comments = NonNullable<
  NonNullable<
    ListCommentsSortedByCreatedAtQuery['listCommentsSortedByCreatedAt']
  >['items']
>

export default Vue.extend({
  async created() {
    this.comments = await this.listComments()
  },
  data() {
    return {
      comment: { ...initialComment },
      comments: [] as Comments | null | undefined,
      containerStyle: { height: '92vh' },
    }
  },
  computed: mapState(['currentUser']),
  methods: {
    async onSubmit() {
      this.validate() && this.createComment()
    },
    async createComment() {
      const res = (await API.graphql({
        query: createComment,
        variables: { input: this.comment },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<CreateCommentMutation>
      if (res.data) this.comment = { ...initialComment }
    },
    async listComments() {
      const res = (await API.graphql({
        query: listCommentsSortedByCreatedAt,
        variables: { type: 'comment' },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<ListCommentsSortedByCreatedAtQuery>
      return res.data?.listCommentsSortedByCreatedAt?.items
    },
    validate() {
      return (this.$refs.form as any).validate()
    },
  },
  mounted() {
    this.containerStyle = {
      height: `${
        window.document.documentElement.clientHeight - appBarHeight
      }px`,
    }
  },
})
</script>

<style scoped>
#button {
  width: 100%;
}
</style>
