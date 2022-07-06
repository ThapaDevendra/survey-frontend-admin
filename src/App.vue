<template>
  <v-app >
    <v-app-bar 
      >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn>Dashboard</v-btn>
      <v-app-bar-title><h2>Survey Creator</h2></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn>Log Out</v-btn>
      <v-btn 
        icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
     <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
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
import Login from './components/LogIn.vue'

export default{
  name: 'app',
  data: () =>({

  }),
  component: {
    Login
  },
  computed:{
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>


