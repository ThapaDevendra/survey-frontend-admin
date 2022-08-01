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
  findOne(id) {
    return http.get(`/surveys/${id}`, {
      headers: { Authorization: `Bearer ${cookies.get("token")}` },
    });
  }
}

export default new SurveyDataService();
