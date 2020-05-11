<template>
  <div class="container">
    <b-row>
      <b-col></b-col>
      <b-col md="7">
        <b-card class="mt-4" header="Latest Feeds" v-if="posts">
          <b-card v-for="post in posts" :key="post.id" class="mb-4">
              <b-avatar variant="primary" class="mr-2"></b-avatar>
              <span class="mr-auto" v-if="post.blogger">{{ post.blogger.username}}</span>
              <span class="mr-auto" v-else>Anonymous</span>
              <router-link :to="`/post/${ post.id }`">
                <h4>{{ post.title }}</h4>
                <p class="mt-2 text-dark">
                  {{ post.body }}
                </p>
              </router-link>
          </b-card>

          <b-button
            variant="outline-primary"
            block
            class="mt-4"
            v-if="postCount && postCount > posts.length"
            @click="loadMorePosts"
          >
            {{ loading ? 'loading more posts...': 'Show More' }}
          </b-button>
        </b-card>
        <div class="text-center" v-else>
          Loading...
        </div>

      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const perPage = 2

const posts = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(first: $first, skip: $skip) {
      id
      title
      body
      createdAt
      updatedAt
      blogger{
        username
        interest
      }
    }
}
`;

export default {
  name: 'Homepage',
  data() {
    return {
      loading: 0,
      posts : [],
      postsCount: null,
    }
  },
  apollo: {
    $loadingKey: 'loading',
    posts: {
      query: posts,
      variables: {
        skip: 0,
        first: perPage
      }
    },
    postCount: {
      query: gql`
        {
          postsConnection {
            aggregate {
              count
            }
          }
        }
      `,
      update: ({ postsConnection }) => postsConnection.aggregate.count
    }
  },
  methods: {
    loadMorePosts() {
      this.$apollo.queries.posts.fetchMore({
        variables: {
          skip: this.posts.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            posts: [...previousResult.posts, ...fetchMoreResult.posts]
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  p {
    text-align: justify;
  }
  a{
    text-decoration: none;
  }
</style>
