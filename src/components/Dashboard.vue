<template>
<v-app>
 <v-app-bar 
      color="blue"
      >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn>Dashboard</v-btn>
      <v-app-bar-title><h2>Survey Creator</h2></v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn>About</v-btn>
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
            v-on="on"
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
      <v-container>
        <router-view />
      </v-container>
    </v-main>
</v-app>
   
</template>


<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
