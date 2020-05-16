<template>
  <b-card>
    <b-form @submit="createPost">
      <b-form-group id="input-group-title" label="Title" label-for="title">
        <b-form-input id="title" v-model="form.title" size="sm" required />
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
</template>

<script>
import { SHOW_CATEGORY, ALL_POSTS } from "@/apollo/graphql/queries"
import { CREATE_POST } from "@/apollo/graphql/mutations"

import axios from "axios"

export default {
  name: "Homepage",
  data() {
    return {
      form: {
        title: null,
        body: null,
        category: null,
        ip: null,
      },
      categories: [],
    }
  },
  apollo: {
    $loadingKey: "loading",
    categories: SHOW_CATEGORY,
  },
  created() {
    this.showIp()
  },
  methods: {
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
          update: (store, { data: { createPost } }) => {
            // console.log(createPost)
            try {
              const ALL_POST_QUERY = {
                query: ALL_POSTS,
                variables: {
                  skip: 0,
                  first: 2,
                },
              }

              let { posts } = store.readQuery({ query: ALL_POST_QUERY })

              posts.push(createPost)

              store.writeQuery({
                query: ALL_POST_QUERY,
                data: {
                  posts: posts,
                },
              })
            } catch (error) {
              console.log(error)
            }
            // const data = store.readQuery(query)

            // store.writeQuery({ query, data })
            // console.log(data)
            // const data = store.readQuery({ query: ALL_POSTS })
            // data.posts.push(createPost)
            // store.writeQuery({ query: ALL_POSTS, data })
          },
          optimisticResponse: {
            __typename: "Mutation",
            createPost: {
              __typename: "Post",
              ip: this.form.ip,
              title: this.form.title,
              body: this.form.body,
              categoryid: this.form.category,
            },
          },
        })
        .then((response) => {
          console.log(response)
          this.$toast.success("Posted")
        })
        .catch((error) => {
          this.$toast.show(error)
          this.$toast.error("Posting Failed...")
        })
    },
    updateAfterPost(store, createPost) {
      const query = {
        query: ALL_POSTS,
        variables: {
          skip: 0,
          first: 2,
        },
      }

      const data = store.readQuery(query)
      store.writeQuery({ ...query, data })
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

<style></style>
