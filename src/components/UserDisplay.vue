<template>
  <v-row>
    <v-col cols="9" sm="2">
      <span
        ><router-link
          class="user_name"
          :to="{ name: 'viewUser', params: { id: user.id } }"
          >{{ user.username }}</router-link
        ></span
      >
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateUser" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteUser" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteUser() {
      this.$emit("deleteUser");
    },
    updateUser() {
      this.$emit("updateUser");
    },
  },
};
</script>

<style>
.user_name {
  color: black;
  text-decoration: none;
}
.user_name:hover {
  color: rgb(77, 75, 75);
  text-decoration: underline;
}
</style>
