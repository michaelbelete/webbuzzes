<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
      <nuxt-link class="navbar-brand" to="/">
        Webuzzes
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent2"
        aria-controls="navbarSupportedContent2"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarSupportedContent2" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item active">
            <nuxt-link to="/" class="nav-link">
              Home
            </nuxt-link>
          </li> -->
        </ul>
        <ul class="navbar-nav">
          <div class="input-group input-group-pill">
            <input
              id="iconRightInput"
              type="text"
              class="form-control"
              name="iconRightInput"
              placeholder="Search Post here"
            />
            <div class="input-group-append">
              <span class="mdi mdi-star-circle input-group-text" />
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style></style>
