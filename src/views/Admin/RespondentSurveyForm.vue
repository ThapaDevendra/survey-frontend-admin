<template>
    <v-container fluid>
        <v-layout align-center>
        </v-layout>
        <v-card class='mx-auto' width="800">
            <v-card-text v-if="!submitted">
                <v-form>

                    <h4 style='color:black'>Respondent form</h4>

                    <button class="btn btn-primary" @click="submitResponse" style="margin-right:16px">Submit</button>
                    <button class="btn btn-danger" @click="goAdminDashboard" style="margin-left:16px">Cancel</button>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>



<script>
export default{
    name: 'surveyForm',
    data(){
        return{
            submitted: false,
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
    }
}
</script>