<template>
<v-container fluid>
    <v-card class='mx-auto' width="900" color="#F4F4F4">
<v-row>
   <v-col cols="9" sm="9">
    <span><h5>Q.  {{question.text}}</h5></span>
   </v-col>
</v-row>
    <v-col cols="9" sm="9">
       <v-text-field v-if="question.questionType === 0" v-model="answer"/>
         <v-checkbox v-if="question.questionType === 1"
            v-for="(item, index) in question.multipleChoices"
            v-bind:key="index"
            >
                {{item}}
            </v-checkbox>
       <v-radio-group v-if="question.questionType === 2" v-model="booleanValue">
         <v-radio name="True" label="True" value="isTrue"/>
         <v-radio name="False" label="False" value="isFalse"/>
      </v-radio-group>
   </v-col>
       </v-card>
       </v-container>
</template>

<script>
 export default {
    name:'surveyForm',
    props:{
      question: Object,
    },
    data(){
       return{
         answer: '',
         booleanValue: 'isTrue'
       } 
    }
 }
</script>