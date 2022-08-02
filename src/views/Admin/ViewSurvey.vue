<template>
  <h1>Survey {{ survey.name }}</h1>
  <v-col cols="12" sm="4">
    <v-btn class="btn btn-primary"  @click="surveyResponses"
      >See responses for this Survey</v-btn
    >
  </v-col>
  <QuestionList
    v-for="(question,i) in questions"
    :key="question.id"
    :question="question"
    :questionNumber="i+1"
  />
</template>
<script>
import SurveyDataService from "../../services/SurveyDataService";
import QuestionDataService from "../../services/QuestionDataService";
import QuestionList from "@/components/QuestionList.vue";
//import emailjs from "emailjs-com";

export default {
  name: "question-list",
  data() {
    return {
      survey: {
        name: "",
        userID: "",
      },
      questions: [],
      currentQuestion: null,
      currentIndex: -1,
      text: "",
    };
  },
  components: {
    QuestionList,
  },
  methods: {
    async surveyResponses() {
      await this.$router.push({ name: "viewResponses", params: {surveyID: this.$route.params.surveyID} });
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
    retrieveQuestions() {
      QuestionDataService.getAllQuestions(this.$route.params.surveyID)
        .then((response) => {
        console.log(response.data);
          this.questions = response.data;
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
    // refreshList() {
    //   this.retrieveQuestions();
    //   this.currentSurvey = null;
    //   this.currentIndex = -1;
    // },
    //     setActiveSurvey(survey, index) {
    //       this.currentSurvey = survey;
    //       this.currentIndex = survey ? index : -1;
    //     },
    //     removeAllSurveys() {
    //       SurveyDataService.deleteAll()
    //         .then((response) => {
    //           console.log(response.data);
    //           this.refreshList();
    //         })
    //         .catch((e) => {
    //           this.message = e.response.data.message;
    //         });
    //     },
    //     searchSurveys() {
    //       if (this.name) {
    //         SurveyDataService.findByName(this.name)
    //           .then((response) => {
    //             this.surveys = response.data;
    //             this.setActiveSurvey(null);
    //           })
    //           .catch((e) => {
    //             this.message = e.response.data.message;
    //           });
    //       } else {
    //         this.retrieveSurveys();
    //       }
    //     },
  },
  mounted() {
    this.retrieveQuestions();
    this.retrieveCurrentSurvey();
  },
};
</script>
<style></style>