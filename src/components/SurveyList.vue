<template>
  <v-row>
    <v-col cols="9" sm="3">
      <span
        ><router-link
          class="user_name"
          :to="{ name: 'viewSurvey', params: { id: survey.id } }"
          >{{ survey.name }}</router-link
        ></span
      >
    </v-col>
    <v-col cols="9" sm="2">
      <span
        ><router-link
          class="user_name"
          :to="'/admindashboard/surveyForm/' + survey.id"
          ><v-btn size="x-small" icon="mdi-plus"/></router-link
        ></span
      >
    </v-col>
    <v-col cols="9" sm="2">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteSurvey" />
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    survey: Object
  },
  data() {
    return {};
  },
  methods: {
    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    updateSurvey() {
      this.$emit("updateSurvey");
    },
    sendEmail() {
      this.$emit("sendEmail");
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