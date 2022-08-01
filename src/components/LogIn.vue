<template>
  <v-container fluid>
    <v-layout align-center> </v-layout>
    <v-card class="mx-auto" width="600">
      <v-toolbar dark color="green">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            id="email"
            prepend-icon="mdi-account-circle"
            name="email"
            label="Email"
            type="text"
            v-model="user.email"
            required
          ></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="user.password"
            required
          ></v-text-field>
          <p class="text-danger">{{ message }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn-primary" type="submit" @click="submit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserDataService from "../services/UserDataService.js";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
      message: "",
      showPassword: true,
    };
  },
  methods: {
    async submit() {
      var data = { email: this.user.email, password: this.user.password };
      await UserDataService.adminuserLogIn(data)
        .then((res) => {
          this.$cookies.set("user", res.data.username);
          this.$cookies.set("role", res.data.role);
          this.$cookies.set("token", res.data.token);
          this.$cookies.set("userID", res.data.id);
          if (res.data.role === "SuperAdmin") {
            this.$router.push({ name: "adminList" });
            this.submitted = true;
            this.user = {};
          }
        })
        .catch((err) => {
          console.log(err);
          this.message = err.response.data;
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>
