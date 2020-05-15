<template>
  <div>
    <b-row>
      <b-col />
      <b-col md="6">
        <b-card class="mb-4">
          <nuxt-link to="/" class="mr-3 mb-4">
            <b-button variant="outline-primary" size="sm">
              Go back
            </b-button>
          </nuxt-link>
          {{ category.name }}
        </b-card>

        <b-card>
          <h2 v-if="loading > 0">
            Loading...
          </h2>
          <div v-else>
            <b-card v-for="post in category.post" :key="post.id">
              <nuxt-link to="/post/{}" class="mr-3 text-dark">
                <h1>{{ post.title }}</h1>
                <p>{{ post.body }}</p>
              </nuxt-link>
              {{ id }}
            </b-card>
          </div>
        </b-card>
      </b-col>
      <b-col />
    </b-row>
  </div>
</template>

<script>
import { SHOW_ONE_CATEGORY } from "@/apollo/graphql/queries"

export default {
  name: "CategoryPage",
  data: () => ({
    loading: 0,
    category: "",
    comment: null,
  }),
  apollo: {
    $loadingKey: "loading",
    category: {
      query: SHOW_ONE_CATEGORY,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
}
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
