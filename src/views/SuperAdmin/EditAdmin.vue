<template>
  <v-container fluid>
    <v-layout align-center> </v-layout>
    <v-card class="mx-auto" width="800">
      <v-card-text v-if="!submitted">
        <v-form>
          <v-text-field
            v-model="user.username"
            name="username"
            type="text"
            label="User Name"
            required
          ></v-text-field>
          <v-text-field v-model="user.email" label="E-mail" required>
          </v-text-field>
          <v-text-field
            v-model="user.role"
            :items="items"
            label="User Role"
            required
          ></v-text-field>
          <h4 style="color: red">{{ message }}</h4>
          <v-btn class="mr-4 btn-primary" @click="saveUser"> Save </v-btn>
          <v-btn class="mr-4 btn-secondary" @click="clear"> clear </v-btn>
          <v-btn class="mr-4 btn-danger" @click="goAdminDashboard">
            Cancel
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-text v-else>
        <h4>Admin-user successfully updated !!</h4>
        <button
          class="btn btn-primary"
          @click="newAdmin"
          style="margin-right: 16px"
        >
          Add New Admin
        </button>
        <button
          class="btn btn-secondary"
          @click="goAdminDashboard"
          style="margin-left: 16px"
        >
          Return
        </button>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import UserDataService from "@/services/UserDataService";
export default {
  name: "updateAdmin",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      adminUsers: [],
      submitted: false,
      message: "",
    };
  },
  methods: {
    getAllAdminUsers() {
      UserDataService.getAllUsers()
        .then((res) => {
          this.adminUsers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refresh() {
      (this.user.username = ""),
        (this.user.email = ""),
        (this.message = ""),
        (this.submitted = false);
    },
    clear() {
      this.refresh();
    },
    saveUser() {
      var data = {
        username: this.user.username,
        role: this.user.role,
        email: this.user.email,
      };
      UserDataService.update(this.user.id, data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log("add ", JSON.stringify(response.data));
          this.$router.push({ name: "adminList" });
        })
        .catch((e) => {
          this.message = e.response;
        });
    },
    cancel() {
      this.$router.push({ name: "adminList" });
    },
    goAdminDashboard() {
      this.$router.push({ name: "adminList" });
    },
    newAdmin() {
      this.refresh();
      this.getAllAdminUsers();
    },
  },
  mounted() {
    UserDataService.get(this.$route.params.id)
      .then((response) => {
        this.user = response.data;
        console.log("user:: ", response.data);
        //  console.log(this.artists.[0].name);
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
  },
};
</script>

<style>
.v-field_field {
  align-items: center;
}
</style>
