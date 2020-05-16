<template>
  <div>
    <b-row>
      <b-col md="1" />
      <b-col md="3">
        <b-card header="Post Categories">
          <div v-if="$apollo.queries.categories.loading" class="text-center">
            loading catagories...
          </div>
          <div v-if="cError" class="text-center">
            {{ cError }}
          </div>
          <b-list-group>
            <b-list-group-item
              v-for="category in categories"
              :key="category.id"
              class="border-bottom"
            >
              <nuxt-link :to="`/category/${category.id}`">
                {{ category.name }}
              </nuxt-link>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col md="5">
        <!-- // add post here -->
        <add-post />
        <b-card class="mt-4" header="Recent Posts">
          <div v-if="pError">
            {{ pError }}
          </div>

          <div v-if="$apollo.queries.posts.loading" class="text-center">
            Loading posts...
          </div>
          <div v-else>
            <div v-for="post in posts" :key="post.id">
              <nuxt-link :to="`/post/${post.id}`">
                <b-card class="mb-4">
                  <h2>{{ post.title }}</h2>
                  <p class="text-dark">
                    {{ cutText(post.body) }} ...
                    <em class="btn btn-link">
                      more
                    </em>
                  </p>
                  <small class="float-right">{{ post.category.name }}</small>
                </b-card>
              </nuxt-link>
            </div>
            <b-button
              v-if="postCount && postCount > posts.length"
              variant="outline-primary"
              block
              class="mt-4"
              size="sm"
              @click="loadMorePosts"
            >
              {{ loading ? "loading more posts..." : "Show More" }}
            </b-button>
          </div>
        </b-card>
      </b-col>
      <b-col md="2" />
    </b-row>
  </div>
</template>

<script>
import { ALL_POSTS, SHOW_CATEGORY, POST_COUNT } from "@/apollo/graphql/queries"
import addPost from "@/components/addPost"

const perPage = 2

export default {
  name: "Homepage",
  components: {
    "add-post": addPost,
  },
  data() {
    return {
      loading: 0,
      pError: null,
      cError: null,
      posts: [],
      categories: [],
    }
  },
  apollo: {
    $loadingKey: "loading",
    posts: {
      query: ALL_POSTS,
      variables: {
        skip: 0,
        first: perPage,
      },
      fetchPolicy: "cache-first",
      error(error) {
        this.pError = JSON.stringify(error.message)
      },
    },
    categories: {
      query: SHOW_CATEGORY,
      fetchPolicy: "cache-first",
      error(error) {
        this.cError = JSON.stringify(error.message)
      },
    },
    postCount: {
      query: POST_COUNT,
      update: ({ postsConnection }) => postsConnection.aggregate.count,
    },
  },
  methods: {
    cutText(text) {
      return text.substr(0, 150)
    },
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
a {
  text-decoration: none;
}
</style>
