import http from "../http-common.js";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

class SurveyResponseDataService {
  getSurveyResponses(surveyID) {
    return http.get("/surveys/" + surveyID + '/responses', {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
}

export default new SurveyResponseDataService();