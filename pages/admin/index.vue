<template>
  <div>
    <b-row class="text-center">
      <b-col>&nbsp;</b-col>
      <b-col cols="4">
        <b-card class="mt-4">
          <b-tabs content-class="mt-3" justified pills>
            <b-tab title="Login" active>
              <b-form @submit="login">
                <b-form-group id="input-group-1" label-for="username">
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter Username"
                    required
                  />
                </b-form-group>
                <b-form-group id="input-group-1" label-for="password">
                  <b-form-input
                    id="username"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter Password"
                    required
                  />
                </b-form-group>

                <b-button
                  type="submit"
                  width="100%"
                  variant="outline-primary"
                  block
                >
                  Login
                </b-button>
              </b-form>
            </b-tab>
            <b-tab title="Signup">
              <p>Signup</p>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col>&nbsp;</b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    }
  },
}
</script>

<style></style>

yarn add -D core-js@3 @babel/runtime-corejs3
