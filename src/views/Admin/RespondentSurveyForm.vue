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
                            <div> {{selectedChoiceItems}}</div>
                            <v-checkbox v-if="question.questionType === 1" 
                                v-for="(item, index) in question.multipleChoices"   
                                v-model="selectedChoiceItems"
                                :value=item
                                :key="question.id"
                            >
                                {{item}}
                            </v-checkbox>
                            <v-radio-group v-if="question.questionType === 2" :key="question.id" v-model="booleanAnswer" >
                                <div> {{booleanAnswer}}</div>
                                <v-radio v-for="option in options" :key=option.id :label=option.label :value= option.value></v-radio>
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
            options:[{id: 0, label: 'True', value: 'True'},{id: 1, label: 'False', value: 'False'}],
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
            console.log('this is input text', this.textFieldAnswer)
            console.log('this is boolean answer', this.booleanAnswer)
            console.log('this is multiple check answer', this.selectedChoiceItems)

        },
        cancel(){

        },
        resetFields(){
            this.booleanValue= "isTrue";
        }
    },
    computed:{
       
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