<template>
  <div>
    <b-row>
      <b-col md="3" />
      <b-col md="6">
        <b-card>
          <h2 v-if="loading > 0">
            Loading...
          </h2>
          <div v-else>
            <div class="border-bottom pb-3">
              <nuxt-link to="/">
                <b-button variant="outline-primary" size="sm" class="mr-3">
                  Go Back
                </b-button>
              </nuxt-link>
              {{ post.title }}
            </div>
            <article class="mt-3">
              {{ post.body }}
            </article>
          </div>
        </b-card>

        <b-card class="mt-3">
          <b-form @submit="createComment">
            <b-form-group
              id="input-group-comment"
              label="Comment"
              label-for="comment"
            >
              <b-form-textarea
                id="comment"
                v-model="comment"
                placeholder="enter your comment here..."
                no-resize
                required
              />
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block>
              Comment
            </b-button>
          </b-form>
          <div
            v-for="comment in post.comment"
            :key="comment.id"
            class="border-bottom p-2 mt-2"
          >
            <h4>{{ comment.comment }}</h4>
            <small>Comment by {{ comment.ip }}</small>
          </div>
        </b-card>
      </b-col>
      <b-col md="3" />
    </b-row>
  </div>
</template>

<script>
import { SHOW_POST } from "@/apollo/graphql/queries"

export default {
  name: "PostPage",
  data: () => ({
    loading: 0,
    post: "",
    comment: null,
  }),
  apollo: {
    $loadingKey: "loading",
    post: {
      query: SHOW_POST,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
  methods: {
    createComment() {
      alert("hello, world")
    },
  },
}
</script>

<style scoped>
.placeholder {
  height: 366px;
  background-color: #eee;
}
</style>
