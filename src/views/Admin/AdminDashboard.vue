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
      <v-row>
        <v-col cols="12" sm="4">
        <v-btn class="btn btn-primary" @click="createSurveyBtn" v-if="!createSurveyIsActive">Create A Survey</v-btn>
        </v-col>
        <v-col cols="12" sm="7" v-if="createSurveyIsActive">
          <v-row>
            <v-text-field label="Survey name" v-model="surveyName"/>
          </v-row>
          <v-row>
            <v-btn class="btn-primary" @click="addSurvey" style="margin-left:46px">Add Survey</v-btn>
            <v-btn class="btn-danger" @click="cancel" style="margin-left:46px">Cancel</v-btn>
          </v-row>
        </v-col>
      </v-row>
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
import SurveyDataService from "../../services/SurveyDataService";
import SurveyList from "@/components/SurveyList.vue";

export default {
  name: "survey-list",
  data() {
    return {
      surveys: [],
      currentSurvey: null,
      currentIndex: -1,
      name: "",
      surveyName: '',
      createSurveyIsActive: false,
      userID: null
    };
  },
  components: {
    SurveyList,
  },
  methods: {
    createSurveyBtn() {
      this.createSurveyIsActive = true;
    },
    cancel(){
      this.createSurveyIsActive = false;
      this.surveyName = ''
    },
    goEdit(survey) {
      this.$router.push({ name: "viewSurvey", params: { id: survey.id } });
    },
    async addSurvey(){
      const obj = {name: this.surveyName, userID: this.userID}
      await SurveyDataService.createASurvey(obj).then((res) =>{
        if(res.data){
          this.refreshList();
          this.resetFields();
          this.cancel();
          //this.$router.push({name: 'survey'})
        }
      }).catch(err => {
        console.log(err.message)
      })
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
    resetFields(){
      this.surveyName = ''
    },
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
    this.userID = this.$cookies.get('userID');
  },
};
</script>
<style></style>