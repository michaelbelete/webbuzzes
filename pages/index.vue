<template>
  <div class="container">
    <b-row>
      <b-col />
      <b-col md="7">
         <b-card v-if="posts" class="mt-4">

         </b-card>
        <b-card v-if="posts" class="mt-4">
          <h4 class="mb-2 border-bottom">Recent Posts</h4>
          <b-card v-for="post in posts" :key="post.id" class="mb-4">
            <b-avatar variant="primary" class="mr-2" />
            <span v-if="post.blogger" class="mr-auto">{{
              post.blogger.username
            }}</span>
            <span v-else class="mr-auto">Anonymous</span>
            <router-link :to="`/post/${post.id}`">
              <h4>{{ post.title }}</h4>
              <p class="mt-2 text-dark">
                {{ post.body }}
              </p>
            </router-link>
          </b-card>

          <b-button
            v-if="postCount && postCount > posts.length"
            variant="outline-primary"
            block
            class="mt-4"
            @click="loadMorePosts"
          >
            {{ loading ? "loading more posts..." : "Show More" }}
          </b-button>
        </b-card>
        <div v-else class="text-center">
          Loading...
        </div>
      </b-col>
      <b-col />
    </b-row>
  </div>
</template>

<script>
import { fetchAllPosts,postCount } from "../apollo/graphql/queries"

const perPage = 2

export default {
  name: "Homepage",
  data() {
    return {
      loading: 0,
      posts: [],
      postsCount: null,
    }
  },
  apollo: {
    $loadingKey: "loading",
    posts: {
      query: fetchAllPosts,
      variables: {
        skip: 0,
        first: perPage,
      },
    },
    postCount: {
      query: postCount,
      update: ({ postsConnection }) => postsConnection.aggregate.count,
    },
  },
  methods: {
    loadMorePosts() {
      this.$apollo.queries.posts.fetchMore({
        variables: {
          skip: this.posts.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            posts: [...previousResult.posts, ...fetchMoreResult.posts],
          })
        },
      })
    },
  },
}
</script>

<style scoped>
p {
  text-align: justify;
}
a {
  text-decoration: none;
}
</style>
