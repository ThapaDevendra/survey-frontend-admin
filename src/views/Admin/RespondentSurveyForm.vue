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
                        <div v-for="(question, index) in questions" :key="question.id">
                        <div>
                            <span class="text-h6">{{question.text}}</span>
                            <p>{{question.id}}</p>
                        </div>
                        <div>
                            <v-text-field v-if="question.questionType === 0" :key="question.id" v-model="textFieldAnswer"/>
                            <!-- <v-for="(item, index) in question.multipleChoices" v-if="question.questionType === 1">
                                 {{item}}</v-for> -->
                            <v-checkbox v-if="question.questionType === 1" 
                                v-for="(item, index) in question.multipleChoices"   
                                v-model="choiceItem"
                                :key="question.id"
                            >
                                {{item}}
                            </v-checkbox>
                            <v-radio-group v-if="question.questionType === 2" :key="question.id" v-model="booleanAnswer">
                                <v-radio name="isTrue" label="True" value="True"/>
                                <v-radio name="isFalse" label="False" value="False"/>
                            </v-radio-group>
                        </div>
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
            textFieldAnswer: '',
            booleanAnswer:'',
            choiceItem:'',
            selectedChoiceItems:[],
            submitted: false,
            surveyID: null,
            surveyName: '',
            questions:[ ],
            answerArray:[],
            answer:{
                questionId: null,
                answerToQuestion: '',
            },
            choiceItem:'',
            
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
        multipleChoiceItem(){

        },
        getInputValue(){
            this.
            console.log()
        },
        isChecked(item){
            console.log('this item is selectd',item)
        },
        submitResponse(){
            console.log('this is answer', this.textFieldAnswer)
            console.log('this is answer', this.booleanAnswer)
            console.log('this is answer', this.selectedChoiceItems)

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