<template>
  <v-row>
    <v-col cols="12" sm="12">
      <span>Respondent ID: {{ response.respondentId }} Responded At: {{ response.createdAt }}</span>
      <v-row     
        v-for="question in response.responses"
        :key="question.id"
      >    
        <v-col cols="12" sm="12">
          <span>Question ID: {{ question.questionId }} </span>
          <span> Answer: {{ question.answer }}</span>
        </v-col>
      </v-row>
      <hr/>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    response: Object
  },
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style>
.user_name {
  color: black;
  text-decoration: none;
}
.user_name:hover {
  color: rgb(77, 75, 75);
  text-decoration: underline;
}
</style>