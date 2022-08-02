import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class SurveyDataService {
  getAllSurveys(userID) {
    return http.get("/surveys/getAllSurveys/" + userID, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
  findByName(name) {
    return http.get(`/surveys/search/${name}`);
  }
  update(id, data) {
    return http.post(`/surveys/${id}`, data, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
  delete(id) {
    return http.delete(`/surveys/${id}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
  get(id) {
    return http.get(`/surveys/${id}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }

    //create a survey
    createASurvey(data){
      return http.post('/surveys/', data);
    }

    //create a question for a Survey
    createQuestion(surveyID, data){
      return http.post(`/surveyQuestion/${surveyID}`, data);
  }

    //create all questions for a Survey
    createASurveyQuestions(surveyID, data){
      return http.post(`surveyQuestion/survey/${surveyID}`, data)
  }

    //get all questions of a Survey
    getAllQuestionsOfASurvey(surveyID){
      return http.get(`/surveyQuestion/survey/${surveyID}`)
  }

    //create respondents for a survey
    createRespondentsForASurvey(surveyID, data){
      return http.post(`/surveyQuestion/${surveyID}/respondents`, data);
  }

}
export default new SurveyDataService();
