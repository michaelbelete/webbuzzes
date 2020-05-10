<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand>Webuzzes</b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
          <b-nav-item to="/admin" exact exact-active-class="active">Admin</b-nav-item>
        </b-navbar-nav>
        <b-nav-form  class="ml-auto">
          <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-collapse>
  </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>

</style>
