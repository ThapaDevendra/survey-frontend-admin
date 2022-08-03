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
    <v-col cols="12" sm="2">
      <span class="text-h6">Name</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Survey Details</span>
    </v-col>
     <v-col cols="12" sm="2">
      <span class="text-h6">Edit Name</span>
    </v-col>
    <v-col cols="12" sm="2">
      <span class="text-h6">Delete</span>
    </v-col>
      <v-row>
        <v-col cols="9" >
          <v-btn class="btn btn-primary" @click="createSurveyBtn" v-if="!createSurveyIsActive && !editMode">Create A Survey</v-btn>
        <div v-if="createSurveyIsActive && !editMode">
          <v-row>
            <v-text-field label="Survey name" v-model="surveyName"/>
          </v-row>
          <v-row>
            <v-btn class="btn-primary" @click="addSurvey" style="margin-left:16px">Add Survey</v-btn>
            <v-btn class="btn-danger" @click="cancel" style="margin-left:16px">Cancel</v-btn>
          </v-row>
        </div>
        <div v-if="editMode">
          <v-row>
              <v-text-field label="Edit Survey name" v-model="editSurveyName"/>
          </v-row>
          <v-row>
             <v-btn class="btn-primary" @click="editSurvey" style="margin-left:16px">Edit Survey</v-btn>
            <v-btn class="btn-danger" @click="cancelEdit" style="margin-left:16px">Cancel</v-btn>
          </v-row>
        </div>
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
import SurveyDataService from "@/services/SurveyDataService";
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
      userID: null,
      surveyId: null,
      editMode: false,
      editSurveyName:'',
      editSurveyId: null
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
      this.editMode = true;
      this.editSurveyName = survey.name;
      this.editSurveyid = survey.id;
    },
    editSurvey(){
          this.surveys.map((obj) => {
          if(obj.id === this.editSurveyid){
              SurveyDataService.update(obj.id, {name: this.editSurveyName}).then((res)=> {
                 this.refreshList();
              }).catch(err => {
                console.log(err.msg);
              })
          }
      })        
        this.cancelEdit();
    },
    cancelEdit(){
      this.editMode = false;
      this.editSurveyName = '';
      this.editSurveyid = null;
    },
    async addSurvey(){
        const obj = {name: this.surveyName, userID: this.userID}
          await SurveyDataService.createASurvey(obj).then((res) =>{
          }).catch(err => {
            console.log(err.message)
          })
        this.refreshList();
        this.resetFields();
        this.cancel();
        this.createSurveyIsActive = false;
    },
    async goDelete(survey) {
     await SurveyDataService.delete(survey.id)
        .then((res) => {
           this.refreshList();
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