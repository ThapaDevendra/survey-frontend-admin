import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class SurveyResponseDataService {
  createSurveyResponse(surveyId, respondentId, data) {
    console.log('this is answers', data)
    return http.post(`/surveys/${surveyId}/responses/${respondentId}`, data);
  }
 
}
export default new SurveyResponseDataService();
