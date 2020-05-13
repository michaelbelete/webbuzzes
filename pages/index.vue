<template>
  <div class="mb-4">
    <b-row>
      <b-col>&nbsp;</b-col>
      <b-col cols="4">
        <b-card class="mt-4">
          <b-tabs content-class="mt-3" justified pills>
            <b-tab title="Login" active>
              <b-form @submit="login">
                <b-form-group
                  id="input-group-username"
                  label-for="username"
                  label="Username"
                >
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter Your Username"
                    required
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-password"
                  label-for="password"
                  label="Password"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter Your Password"
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
              <b-form @submit="signup">
                <b-form-group
                  id="input-group-1"
                  label-for="username"
                  label="Username"
                >
                  <b-form-input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter Your Username"
                    required
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-2"
                  label-for="password"
                  label="Password"
                >
                  <b-form-input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Enter Your Password"
                    required
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-3"
                  label-for="interest"
                  label="Interest"
                >
                  <b-form-input
                    id="interest"
                    v-model="form.interest"
                    type="text"
                    placeholder="Enter Your Interests"
                    required
                  />
                </b-form-group>
                <b-button
                  type="submit"
                  width="100%"
                  variant="outline-primary"
                  block
                >
                  Signup
                </b-button>
              </b-form>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col>&nbsp;</b-col>
    </b-row>
  </div>
</template>

<script>
import { addBlogger, login } from "@/apollo/graphql/queries"

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
        interest: null,
      },
    }
  },
  mounted() {
    this.createSession("0")
  },
  methods: {
    createSession(value) {
      sessionStorage.setItem("bloggerid", value)
    },
    login(evt) {
      evt.preventDefault()
      this.$apollo
        .query({
          query: login,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then((response) => {
          if (response.data === null) {
            this.$toast.error("Your username or password is incorrect")
          } else {
            this.createSession(response.data.id)
            this.$router.replace("/admin")
          }
        })
        .error((error) => {
          this.$toast.error(error)
        })
    },
    signup(evt) {
      evt.preventDefault()
      this.$apollo
        .mutate({
          mutation: addBlogger,
          variables: {
            username: this.form.username,
            password: this.form.password,
            interest: this.form.interest,
          },
        })
        .then((response) => {
          // localStorage.setItem("bloggerid", response.data.createBlogger.id)
          this.createSession(response.data.createBlogger.id)
          this.$toast.success("Signed in")
          this.$router.replace("/admin/")
        })
        .catch((error) => {
          this.$toast.show("Can't login")
          this.$toast.show(error)
        })
      // this.$apollo.mutate({
      //   query: addBlogger
      // })
    },
  },
}
</script>

<style></style>
