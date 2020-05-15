<template>
  <div>
    <b-row>
      <b-col md="1" />
      <b-col md="3">
        <b-card header="Post Categories">
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
        <b-card>
          <b-form @submit="createPost">
            <b-form-group
              id="input-group-title"
              label="Title"
              label-for="title"
            >
              <b-form-input
                id="title"
                v-model="form.title"
                size="sm"
                required
              />
            </b-form-group>
            <b-form-group
              id="input-group-category"
              label="Category"
              label-for="category"
            >
              <select
                id="category"
                v-model="form.category"
                class="input-sm form-control-sm form-control"
                required="required"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </b-form-group>
            <b-form-group id="input-group-body" label="Body" label-for="body">
              <b-form-textarea
                id="body"
                v-model="form.body"
                no-resize
                rows="3"
                size="sm"
                placeholder="anything buzzing you..."
                required
              />
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block>
              Post
            </b-button>
          </b-form>
        </b-card>
        <b-card class="mt-4" header="Recent Posts">
          <div v-if="error">
            {{ error }}
          </div>
          <div v-if="posts">
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
          <div v-else class="text-center">
            Loading...
          </div>
        </b-card>
      </b-col>
      <b-col md="2" />
    </b-row>
  </div>
</template>

<script>
import {
  ALL_POSTS,
  CREATE_POST,
  SHOW_CATEGORY,
  POST_COUNT,
} from "@/apollo/graphql/queries"

import axios from "axios"

const perPage = 2

export default {
  name: "Homepage",
  data() {
    return {
      loading: 0,
      error: null,
      posts: [],
      categories: [],
      form: {
        title: null,
        body: null,
        category: null,
        ip: null,
      },
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
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
    categories: SHOW_CATEGORY,
    postCount: {
      query: POST_COUNT,
      update: ({ postsConnection }) => postsConnection.aggregate.count,
    },
  },
  created() {
    this.showIp()
  },
  methods: {
    cutText(text) {
      return text.substr(0, 150)
    },
    createPost(evt) {
      evt.preventDefault()
      this.$toast.show("starting post")
      this.$apollo
        .mutate({
          mutation: CREATE_POST,
          variables: {
            ip: this.form.ip,
            title: this.form.title,
            body: this.form.body,
            categoryid: this.form.category,
          },
        })
        .then((response) => {
          this.$toast.show(response.data)
          this.$toast.success("Posted")
        })
        .catch((error) => {
          this.$toast.show(error)
          this.$toast.error("Posting Failed...")
        })
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
    showIp() {
      axios.get("https://api.ipify.org?format=json").then((response) => {
        this.form.ip = response.data.ip
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
