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
                :scroll="index === comments.length - 1"
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
import {
  API,
  GraphQLResult,
  GRAPHQL_AUTH_MODE,
  graphqlOperation,
} from '@aws-amplify/api'
import { AWSAppSyncRealTimeProvider } from '../node_modules/@aws-amplify/pubsub/lib-esm'
import { Observable } from '../node_modules/zen-observable-ts'
import { createComment } from '../graphql/mutations'
import { listCommentsSortedByCreatedAt } from '../graphql/queries'
import { onCreateComment } from '../graphql/subscriptions'
import {
  CreateCommentMutation,
  ListCommentsSortedByCreatedAtQuery,
  OnCreateCommentSubscription,
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
  data() {
    return {
      comment: { ...initialComment },
      comments: [] as Comments | null | undefined,
      containerStyle: { height: '92vh' },
    }
  },
  computed: mapState(['currentUser']),
  async created() {
    this.comments = await this.listComments()
    this.containerStyle = {
      height: `${
        window.document.documentElement.clientHeight - appBarHeight
      }px`,
    }
    this.subscribe()
  },
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
    subscribe() {
      console.log('subscribe function called.')
      const observable = API.graphql({
        query: onCreateComment,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      }) as Observable<{ value: { data: OnCreateCommentSubscription } }>
      observable && console.log('got res.')
      observable.subscribe({
        next: (data) => {
          console.log('next function called.')
          console.log(data)
          // console.log(data.value.data.onCreateComment)
          // this.comments &&= [...this.comments, data.onCreateComment]
          // console.log(this.comments?.map((c) => c?.body))
        },
      })
      // const res = await API.graphql(
      //   graphqlOperation(onCreateComment),
      //   {authMode: GRAPHQL_AUTH_MODE.API_KEY},
      // )
      // res && console.log('got res.')
      // res.subscribe({
      //   next: (data) => {
      //     console.log('next function called.')
      //     console.log(data.)
      //     // this.comments &&= [...this.comments, data.onCreateComment]
      //     console.log(this.comments?.map((c) => c?.body))
      //   },
      // })
    },
  },
})
</script>

<style scoped>
#button {
  width: 100%;
}
</style>
