<template>
  <h1>Survey {{ survey.name }}</h1>
  <v-col cols="12" sm="4">
    <v-btn class="btn btn-primary"  @click="viewSurvey"
      >View Questions</v-btn
    >
  </v-col>
  <hr/>
  <SurveyResponseListEntry
    v-for="response in responses"
    :key="response.id"
    :response="response"
  />
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
import SurveyResponseDataService from "../../services/SurveyResponseService";
import SurveyResponseListEntry from "@/components/SurveyResponseListEntry.vue";

export default {
  name: "ViewResponses",
  data() {
    return {
      survey: {
        name: "",
        userID: "",
      },
      responses: [],
    };
  },
  components: {
    SurveyResponseListEntry,
  },
  methods: {
    async viewSurvey() {
      await this.$router.push({ name: 'viewSurvey', params: { surveyID: this.$route.params.surveyID } });
    },
    retrieveResponses() {
      SurveyResponseDataService.getSurveyResponses(this.$route.params.surveyID)
        .then((response) => {
        console.log(response.data);
          this.responses = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    retrieveCurrentSurvey(){
        SurveyDataService.findOne(this.$route.params.surveyID)
            .then((response)=>{this.survey=response.data})
            .catch((e) => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveResponses();
    this.retrieveCurrentSurvey();
  },
};
</script>
<style></style>