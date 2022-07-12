<template>
  <SAdminDashboardVue />
  <v-btn class="btn btn-primary" @click="addNewAdmin">Add New Admin</v-btn>
  <ViewAllUsers />
</template>


<script >
import SAdminDashboardVue from "../components/SAdminDashboard.vue";
import ViewAllUsers from "../components/ViewAllUsers.vue";
export default {
  data() {
    return {};
  },
  components: {
    SAdminDashboardVue,
    ViewAllUsers,
  },

  methods: {
    async addNewAdmin() {
      await this.$router.push({ name: "addAdmin" });
    },
  },
};
</script>