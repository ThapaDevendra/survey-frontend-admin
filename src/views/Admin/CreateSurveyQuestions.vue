<template>
    <p>{{survey}}</p>
    <SurveyForm
        v-for="(item, index) in questions"
        :key="index"
        :question="item"
        :index="index"
    />
    <div v-if="!isCompleted">
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
                <v-btn class="btn btn-primary"  @click="saveSurveyQuestions" style="margin-right:16px">Save Survey</v-btn>
                <v-btn @click="removeAllQuestions" style="margin-right:16px" class="btn btn-secondary">Remove All</v-btn>
                <v-btn @click="cancel" class="btn btn-danger">Cancel</v-btn>
            </v-col>
            </v-row>
    </div>  
    <div v-else>
        <v-btn @click="cancel" class="btn btn-danger">Return</v-btn>
    </div>          
</template>

<script>
import SurveyForm from '@/components/SurveyForm.vue';
import SurveyDataService from '@/services/SurveyDataService';
export default{
    name: 'surveyQuestions',
    data(){
        return{
            question:{
                text: '',
                questionType: null,
                multipleChoices: []
            },
            isCompleted: false,
            surveyID: null,
            surveyName: 'dsfasdfasdfas',
            questions:[ ],
            booleanValue:'isTrue',
            newChoiceItem:'',
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
        saveSurveyQuestions(){
            const surveyId = this.$route.params.surveyID;
            this.emails = this.emailsString.split(/[, ]+/g);
            const assignProperty = this.emails.map((data) =>{
                return{respondentEmail: data}
            })

            const sendObj = {questions: this.questions, respondents: assignProperty}
            SurveyDataService.createASurveyQuestions(surveyId, sendObj).then((data) => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
            this.cancel();
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
    mounted(){
       SurveyDataService.getAllQuestionsOfASurvey(this.$route.params.surveyID).then((res) => {
         if(res.data){
            this.questions = res.data;
            this.isCompleted = true;
         }
       }) 
    }
};
 
</script>