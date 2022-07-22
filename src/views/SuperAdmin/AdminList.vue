<template>
  <h1>Users List</h1>
  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="searchUsers"> Search </v-btn>
    </v-col>
    <v-col col="12" sm="10">
      <v-text-field density="compact" clearable v-model="username" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="3">
      <span class="text-h6">Name</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Edit</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Delete</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Email</span>
    </v-col>
    <v-col cols="12" sm="2">
      <v-btn class="btn btn-primary" @click="addNewAdmin">Add New Admin</v-btn>
    </v-col> 
  </v-row>
  <SAdminDashboard
    v-for="user in users"
    :key="user.id"
    :user="user"
    @deleteUser="goDelete(user)"
    @updateUser="goEdit(user)"
    @sendEmail="goSendEmail(user)"
  />
</template>
<script>
import UserDataService from "../../services/UserDataService";
import SAdminDashboard from "@/components/SAdminDashboard.vue";
import emailjs from 'emailjs-com';

export default {
  name: "user-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      username: "",
    };
  },
  components: {
    SAdminDashboard,
  },
  methods: {
    async addNewAdmin() {
      await this.$router.push({ name: "addAdmin" });
    },
    goEdit(user) {
      this.$router.push({ name: "edit", params: { id: user.id } });
    },
    goDelete(user) {
      UserDataService.delete(user.id)
        .then(() => {
          this.retrieveUsers();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goSendEmail(user){
      var loginInfo = {
        to_name: user.username,
        from_name: 'Survey Creator',
        message: `your email: ${user.email}, your password: Survey`
      }
      emailjs.send('service_survey','template_ah6dg3e',loginInfo,'yV9AlYGCoR5id2Enh')
    },
    retrieveUsers() {
      UserDataService.getAllUsers()
        .then((response) => {
          this.users = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
    },
    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    searchUsers() {
      UserDataService.findByName(this.name)
        .then((response) => {
          this.users = response.data;
          this.setActiveUser(null);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>
<style></style>