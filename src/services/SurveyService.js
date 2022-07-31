import http from '../http-common.js';
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies();

class SurveyService{
    
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

export default new SurveyService();