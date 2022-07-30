<template>
  <h1>Survey List</h1>
  <v-row>
    <v-col cols="12" sm="2">
      <v-btn color="success" @click="searchSurveys"> Search </v-btn>
    </v-col>
    <v-col col="12" sm="10">
      <v-text-field density="compact" clearable v-model="name" />
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
    <!-- <v-col cols="12" sm="2">
      <span class="text-h6">Email Customers</span>
    </v-col> -->
    <v-col cols="12" sm="2">
      <v-btn class="btn btn-primary" @click="createNewSurvey"
        >Create A New Survey</v-btn
      >
    </v-col>
  </v-row>
  <SurveyList
    v-for="survey in surveys"
    :key="survey.id"
    :survey="survey"
    @deleteSurvey="goDelete(survey)"
    @updateSurvey="goEdit(survey)"
    @sendEmail="goSendEmail(user)"
  />
</template>
<script>
import UserDataService from "../../services/UserDataService";
import SurveyDataService from "../../services/SurveyDataService";
import SurveyList from "@/components/SurveyList.vue";
import emailjs from "emailjs-com";

export default {
  name: "survey-list",
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      name: "",
    };
  },
  components: {
    SurveyList,
  },
  methods: {
    async createNewSurvey() {
      await this.$router.push({ name: "createSurvey" });
    },
    goEdit(survey) {
      this.$router.push({ name: "viewSurvey", params: { id: survey.id } });
    },
    goDelete(survey) {
      SurveyDataService.delete(survey.id)
        .then(() => {
          this.retrieveSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    // goSendEmail(user) {
    //   var loginInfo = {
    //     to_name: user.username,
    //     from_name: "Survey Creator",
    //     message: `your email: ${user.email}, your password: Survey`,
    //   };
    //   emailjs.send(
    //     "service_survey",
    //     "template_ah6dg3e",
    //     loginInfo,
    //     "yV9AlYGCoR5id2Enh"
    //   );
    // },
    retrieveSurveys() {
      SurveyDataService.getAllSurveys(this.$cookies.get("userID"))
        .then((response) => {
          this.surveys = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    removeAllSurveys() {
      SurveyDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    searchSurveys() {
      if (this.name) {
        SurveyDataService.findByName(this.name)
          .then((response) => {
            this.surveys = response.data;
            this.setActiveSurvey(null);
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        this.retrieveSurveys();
      }
    },
  },
  mounted() {
    this.retrieveSurveys();
  },
};
</script>
<style></style>