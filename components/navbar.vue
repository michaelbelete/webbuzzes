<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
      <a class="navbar-brand" href="#"
        ><img src="assets/images/logo.svg" alt="logo"
      /></a>
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
          <li class="nav-item active">
            <b-nav-item to="/" exact exact-active-class="active">
              Home
            </b-nav-item>
          </li>
          <li class="nav-item">
            <b-nav-item to="/admin" exact exact-active-class="active">
              Home
            </b-nav-item>
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Elements</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <div class="input-group input-group-pill">
            <input
              id="iconRightInput"
              type="text"
              class="form-control"
              name="iconRightInput"
              placeholder="right with icon"
              value="right with icon"
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
