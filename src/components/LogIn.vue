<template>
        <v-container fluid >
            <v-layout align-center>
            </v-layout>
               <v-card  class ='mx-auto' width="600">
                     <v-toolbar dark color="blue">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="mdi-account-circle"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" class="mt-4" color="blue" >Login</v-btn>
                  </v-card-actions>
                </v-card>
        </v-container>
</template>

<script>
import UserDataService from '../services/UserDataService.js' 
export default {
   name: 'Login',
   props: {
      users: []
   },
   methods:{
    getUsers() {
      UserDataService.getAllUser().then(res => {
         //this.users = res.data;
         console.log("hellp", res.data)
      }).catch(err => {
         console.log(err);
      });
    }
   },
   mounted(){
      this.getUsers();
   },
};
</script>

<style></style>
