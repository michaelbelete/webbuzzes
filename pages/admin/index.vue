<template>
  <div>
    <b-row>
      <b-col md="1" />
      <b-col md="2" class="mt-4">
        <sidebar />
      </b-col>
      <b-col md="5">
        <b-card class="mt-4">
          <b-form @submit="addPost">
            <b-form-group id="title-group" label="Title" label-for="title">
              <b-input
                id="title"
                v-model="form.title"
                placeholder="Title"
                type="text"
                required
              />
            </b-form-group>
            <b-form-group id="body-group" label="Body" label-for="body">
              <b-form-textarea
                id="body"
                v-model="form.body"
                placeholder="What is buzzing you..."
                rows="2"
                no-resize
                required
              />
            </b-form-group>
            <b-button type="submit" variant="outline-primary" size="sm" block>
              Post
            </b-button>
          </b-form>
        </b-card>
        <b-card class="mt-4">
          <h4 class="mb-2 border-bottom">
            Recent Posts
          </h4>
          <div v-if="posts">
            <b-card v-for="post in posts" :key="post.id" class="mb-4">
              <b-avatar variant="primary" class="mr-2" />
              <span v-if="post.blogger" class="mr-auto">{{
                post.blogger.username
              }}</span>
              <span v-else class="mr-auto">Anonymous</span>
              <span>
                <!-- <button varient="info" @click="editPost(post.id)">Edit</button> -->
                <button varient="danger" @click="deletePost(post.id)" />
              </span>
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
import sidebar from "@/pages/admin/sidebar"
import { fetchAllPosts, postCount, addPost } from "@/apollo/graphql/queries"

const perPage = 2

export default {
  name: "Admin",
  components: {
    sidebar,
  },
  data() {
    return {
      loading: 0,
      posts: [],
      postsCount: null,
      form: {
        title: null,
        body: null,
      },
      message: null,
      bloggerid: sessionStorage.getItem("bloggerid"),
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
  mounted() {
    this.checkLogin(0)
  },
  methods: {
    checkLogin(value) {
      if (this.bloggerid === value) {
        this.$router.replace("/")
      }
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
    addPost(evt) {
      evt.preventDefault()
      this.$apollo
        .mutate({
          mutation: addPost,
          variables: {
            title: this.form.title,
            body: this.form.body,
            blogger: this.blogger,
          },
        })
        .then((response) => {
          this.$toast.success(response.data)
          this.$toast.success("Post added successfully")
        })
        .catch((error) => {
          this.$toast.error(error)
          this.$toast.error("Not posted")
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
