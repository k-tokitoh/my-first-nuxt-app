<template>
  <v-container>
    <v-row>
      <v-form ref="form" @submit.prevent>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="comment.body"
            outlined
            placeholder="input your comment here"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-btn type="submit" @click="createComment">Post</v-btn>
        </v-col>
      </v-form>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { API, GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { createComment } from '../graphql/mutations'
import { listComments } from '../graphql/queries'
import { CreateCommentMutation, ListCommentsQuery } from '../src/API'

const initialComment = { body: undefined }

export default Vue.extend({
  created() {
    this.listComments()
  },
  data() {
    return {
      comment: { ...initialComment },
      comments: [],
    }
  },
  computed: mapState(['currentUser']),
  methods: {
    async onSubmit() {
      this.currentUser ? this.createComment() : alert('login needed.')
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
        query: listComments,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<ListCommentsQuery>
    },
  },
})
</script>
