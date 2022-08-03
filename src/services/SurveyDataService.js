import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class SurveyDataService {
  getAllSurveys(userID) {
    return http.get(`/surveys/getAllSurveys/${userID}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
  findByName(name) {
    return http.get(`/surveys/search/${name}`);
  }
  update(id, data) {
    return http.put(`/surveys/${id}`, data, {
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
  findOne(id) {
    return http.get(`/surveys/${id}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }

    //create a survey
    createASurvey(data){
      return http.post('/surveys/', data);
    }

    //create a question a Survey
    createQuestion(surveyID, data){
      return http.post(`/surveyQuestion/${surveyID}`, data);
  }

    //create all questions for a Survey with respondents
    createASurveyQuestions(surveyId, data){
      return http.post(`/surveyQuestion/survey/${surveyId}`, data)
  }

    //get all questions of a Survey
    getAllQuestionsOfASurvey(surveyID){
      return http.get(`/surveyQuestion/survey/${surveyID}`)
  }

}
export default new SurveyDataService();
