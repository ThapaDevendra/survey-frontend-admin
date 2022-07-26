<template>
  <v-row>
    <v-col cols="9" sm="3">
      <span
        ><router-link
          class="user_name"
          :to="{ name: 'viewAdmin', params: { id: user.id } }"
          >{{ user.username }}</router-link
        ></span
      >
    </v-col>
    <v-col cols="9" sm="2">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateUser" />
    </v-col>
    <v-col cols="9" sm="2">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteUser" />
    </v-col>
    <v-col cols="9" sm="2">
      <v-btn size="x-small" @click="sendEmail">Send</v-btn>
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
    sendEmail(){
      this.$emit('sendEmail');
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