import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class SurveyResponseDataService {
  createSurveyResponse(surveyID, respondentID, data) {
    console.log('this is answers', data)
    return http.post(`/surveys/${surveyID}/responses/${respondentID}`, data);
  }
 
}
export default new SurveyResponseDataService();
