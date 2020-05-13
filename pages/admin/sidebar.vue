<template>
  <div>
    <b-card>
      <b-list-group>
        <b-list-group-item class="border-bottom">
          <nuxt-link to="/admin">
            Home
          </nuxt-link>
        </b-list-group-item>
        <b-list-group-item class="border-bottom">
          <nuxt-link to="/posts">
            Manage Posts
          </nuxt-link>
        </b-list-group-item>
        <b-list-group-item>
          <nuxt-link to="/">
            Logout
          </nuxt-link>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>
