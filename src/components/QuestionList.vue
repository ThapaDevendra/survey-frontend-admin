<template>
  <v-row>
    <v-col cols="9" sm="3">
      <span class="user_name">{{questionNumber}}. {{ question.text }}</span>
    </v-col>
    <!-- <v-col cols="9" sm="2">
      <v-btn size="x-small" @click="sendEmail">Send</v-btn>
    </v-col> -->
  </v-row>
</template>

<script>
export default {
  props: {
    question: Object,
    questionNumber: Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.user_name {
  color: black;
  text-decoration: none;
}
/* .user_name:hover {
  color: rgb(77, 75, 75);
  text-decoration: underline;
} */
</style>