<template>
  <v-app>
    <v-app-bar app color='green'>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn>Dashboard</v-btn>
      <v-app-bar-title>
        <h2>Survey Creator</h2>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-row v-if="this.username">
        <v-col>{{ this.role }}</v-col>
        <v-col>{{ this.username }}</v-col>
        <v-col>
          <v-btn text class="mr-2" @click="logoutUser">Logout</v-btn>
        </v-col>
      </v-row>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => { }">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/LogIn.vue"


export default {
  name: 'app',
  data() {
    return {
      username: '',
      role: ''
    }

  },
  methods: {
    logoutUser() {
      this.$router.push({ name: 'login' });
      this.username = '',
      this.role = '',
      this.$cookies.remove('token')  // return this
      this.$cookies.remove('user')
      this.$cookies.remove('role')
    }
  },
  watch: {
    $route(to, from) {
      if ((to.path == '/super-admindashboard' || to.path == '/user/admin-surveyForm') && from.path == '/') {
          this.username = this.$cookies.get('user');
          this.role =  this.$cookies.get('role');
      }
    },
  },
  component: {
    Login
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>


