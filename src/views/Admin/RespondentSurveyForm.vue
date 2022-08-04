<template>
    <v-container fluid>
        <v-layout align-center>
        </v-layout>
        <v-card class='mx-auto' width="800">
            <v-card-text v-if="!submitted">
                <div>
                    <h1>{{this.surveyName}}</h1>
                </div>
                <div class="body">
                    <v-form>
                        <div v-for="(question, index) in questions" :key="index">
                        <div>
                            <span class="text-h6">{{question.text}}</span>
                        </div>
                        <div>
                            <v-text-field v-if="question.questionType === 0"  v-model="question.answer"/>
                              <!-- <div v-if="question.questionType === 1" >
                                <div v-for="choice in question.multipleChoices" >
                                    <label>{{choice}}</label>
                                    <input type="checkbox" :value="choice" v-model="question.checkedItems" />
                                </div>
   	                            <br />
	                        </div> -->
                            <v-checkbox v-if="question.questionType === 1" 
                                v-for="(item, index) in question.multipleChoices"  
                                :value=item
                                v-model = "checkedItems"
                            >
                                {{item}}</v-checkbox>
                            <v-radio-group v-if="question.questionType === 2"  v-model="question.answer">
                                <v-radio name="True" label="True" value="True"></v-radio>
                                <v-radio name="False" label="False" value="False"></v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                    </v-form>
                </div>
                    <button class="btn btn-primary" @click="submitResponse" style="margin-right:16px">Submit</button>
            </v-card-text>
        </v-card>
    </v-container>
</template>



<script>
import SurveyDataService from '@/services/SurveyDataService'
import SurveyResponseDataService from '@/services/SurveyResponseDataService'

export default{
    name: 'surveyForm',
    data(){
        return{
            submitted: false,
            surveyID: null,
            surveyName: '',
            questions:[],
            checkedItems:[],
            answer:{
                questionId: null,
                answerToQuestion: '',
            },
            emailsString:'',
            email:{
                respondentEmail: ''
            },
            emails:[],
            questionTypes: [
                {
                    id: 0,
                    type: 'Short answer'
                },
                {
                    id: 1,
                    type: 'Multiple choice'
                },
                {
                    id: 2,
                    type: 'True False'
                }
            ]
        }
    },
    methods:{
        submitResponse(){
            const respondentId = this.$route.params.respondentID;
            const surveyId = this.$route.params.surveyID;
            // console.log(this.checkedItems)
            // console.log('this is answer', this.questions)
            //console.log('this is answer', respondentID)
            const responses = this.questions.map((obj) => {
                if(obj.multipleChoices.length > 1){
                    return {questionId: obj.id, answer: this.checkedItems.toString()}
                }else{
                   return {questionId: obj.id, answer: obj.answer} 
                }             
            })
            SurveyResponseDataService.createSurveyResponse( surveyId, respondentId, responses).catch(err => {
                console.log(err.message)
            })
        },
    },
    computed:{
       // router.post('/:surveyId/responses/:respondentId', survey_response.create);
    },
    mounted(){
        const surveyID = this.$route.params.surveyID;
        SurveyDataService.getAllQuestionsOfASurvey(surveyID).then((res) => {
         if(res.data){
            this.questions = res.data;
            console.log('these are questions', this.questions)
            SurveyDataService.get(surveyID).then((res) => {
                this.surveyName = res.data.name;
            }).catch(err => {
                console.lot(err.message)
            })
         }
       }).catch(err => {
        console.log(err.message)
       }) 
    }
}
</script>
<style>
.body{
    margin-top:40px;
}
</style>