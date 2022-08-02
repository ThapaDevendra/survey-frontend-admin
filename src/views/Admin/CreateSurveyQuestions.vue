<template>
    <p>{{surveyName}}</p>
    <SurveyForm
        v-for="(item, index) in questions"
        :key="index"
        :question="item"
        :index="index"
    />
    
       <v-row align="center">
                <v-col cols="11" md="8">
                    <v-text-field
                        v-model=question.text
                        type="text"
                        label="Question"
                    /> 
                </v-col>
                <v-col class="d-flex" cols="11" sm="3">
                    <v-select
                        :items="questionTypes"
                        item-title="type"
                        item-value="id"
                        v-model="question.questionType"
                        label="Question Types"
                    />
                    <v-btn class="mx-2" @click="addQuestion">Add Question</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-if="question.questionType === 0" label="Your Answer" type='text'/>
                    <div v-if="question.questionType === 1">
                        <v-checkbox 
                            v-for="(item, index) in question.multipleChoices"
                            v-bind:key="index"
                        >
                            {{item}}
                        </v-checkbox>
                        <v-text-field
                            v-model="newChoiceItem"
                        />
                        <v-btn @click="addNewChoiceItem">Add</v-btn>
                    </div>
                    <v-radio-group v-if="question.questionType===2" v-model="booleanValue">
                        <v-radio name="True" label="True" value="isTrue"/>
                        <v-radio name="False" label="False" value="isFalse"/>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9" sm="6">
            <v-text-field label="Respondent Emails" v-model = "emailsString"></v-text-field> 
            </v-col>
            <v-col cols="6" sm="6">
                <v-btn class="btn btn-primary"  @click="sendASurveyQuestions" style="margin-right:16px">Send Survey</v-btn>
                <v-btn @click="removeAllQuestions" style="margin-right:16px" class="btn btn-secondary">Remove All</v-btn>
                <v-btn @click="cancel" class="btn btn-danger">Cancel</v-btn>
            </v-col>
            </v-row>
            
</template>

<script>
import SurveyForm from '@/components/SurveyForm.vue';

export default{
    name: 'surveyQuestions',
    data(){
        return{
            question:{
                text: '',
                questionType: null,
                multipleChoices: []
            },
            surveyID: null,
            surveyName: 'dsfasdfasdfas',
            questions:[ ],
            booleanValue:'isTrue',
            newChoiceItem:'',
            emailsString:'',
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
    components:{
        SurveyForm
    },
    methods:{
        addNewChoiceItem(){
            this.question.multipleChoices.push(this.newChoiceItem);
            this.newChoiceItem = '';
        },
        addQuestion(){
            this.questions.push(this.question);
            this.clearQuestionField();
        },
        sendASurveyQuestions(){
            const surveyID = 2 //needs to have default surveyID
            this.emails = this.emailsString.split(/[, ]+/g);
            // SurveyService.createASurveyQuestions(surveyID, this.questions).then((data) => {
            //     console.log(data);
            // }).catch(err => {
            //     console.log(err);
            // })
            // SurveyService.createRespondentsForASurvey(surveyID, this.emails).then((data) =>{
            //     console.log(data);
            // }).catch(err => {
            //     console.log(err);
            // })
            this.deleteAllFields();
        },
        cancel(){
            this.clearQuestionField();
            this.deleteAllFields();
            this.$router.push({name: 'surveyList'})
        },
        clearQuestionField(){
            this.question = {text: '', questionType: null, multipleChoices: []}
        },
        deleteAllFields(){
            this.questions = [];
            this.emails = [];
            this.emailsString = ''
        },
        removeAllQuestions(){
            this.deleteAllFields();
        },
    },
};
 
</script>