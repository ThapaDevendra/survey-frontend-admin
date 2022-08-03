import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class QuestionDataService {
  getAllQuestions(surveyID) {
    return http.get("/surveyQuestion/survey/" + surveyID, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
}

export default new QuestionDataService();