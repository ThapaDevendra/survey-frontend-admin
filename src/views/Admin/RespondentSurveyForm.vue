<template>
    <v-container fluid>
        <v-layout align-center>
        </v-layout>
        <v-card class='mx-auto' width="800">
            <v-card-text v-if="!submitted">
                <div>
                    <h1>{{this.surveyName}}</h1>
                </div>
                <v-spacer></v-spacer>
                <div class="body">
                    <v-form v-for="(question, index) in questions" :key="index">
                    <div>
                        <span class="text-h6">{{question.text}}</span>
                        <p>{{question.surveyId}}</p>
                    </div>
                    <div>
                        <v-text-field v-if="question.questionType === 0" v-model="surveyName"   />
                        <v-checkbox v-if="question.questionType === 1"
                            v-for="(item, index) in question.multipleChoices"                                
                            v-bind:key="index"
                            v-model="selectedChoice"
                        >
                        {{item}}
                        </v-checkbox>
                        <v-radio-group v-if="question.questionType === 2" v-model="booleanValue">
                            <v-radio name="True" label="True" value="isTrue"/>
                            <v-radio name="False" label="False" value="isFalse"/>
                        </v-radio-group>
                    </div>
                    </v-form>
                </div>
                    <button class="btn btn-primary" @click="submitResponse" style="margin-right:16px">Submit</button>
                    <button class="btn btn-danger" @click="reset" style="margin-left:16px">Reset</button>
            </v-card-text>
        </v-card>
    </v-container>
</template>



<script>
import SurveyDataService from '@/services/SurveyDataService'

export default{
    name: 'surveyForm',
    data(){
        return{
            surveyName: '',
            questions: [],
            shortAnswer: '',
            booleanValue: "isTrue",
            selectedChoice: '',
            selectedChoices: [],
            submitted: false,
            response:[],
            survey: {
                id: null,
                questions: [],
                questionType: null,
            },
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
            console.log('this is answer', this.response)
        },
        cancel(){

        },
        resetFields(){
            this.booleanValue= "isTrue";
        }
    },
    mounted(){
        const surveyID = 3
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