<template>
  <div class="bg-gradient-black DejaVue">
    <navbar />
    <div class="container pb-4">
      <nuxt />
    </div>
  </div>
</template>
<script>
import navbar from "~/components/navbar"
export default {
  components: {
    navbar,
  },
}
</script>
