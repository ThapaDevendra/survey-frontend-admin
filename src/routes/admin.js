export default[

    {
        path: "/admindashboard",
        name: "surveyList",
        component: () => import("@/views/Admin/AdminDashboard.vue"),
    },
    {
        path: "/admindashboard/viewSurvey/:surveyID",
        name: "viewSurvey",
        component: () => import("@/views/Admin/ViewSurvey.vue"),
    },
    {
        path: "/admindashboard/surveyForm/:surveyID",
        name: "newSurveyForm",
        component: () => import("@/views/Admin/CreateSurveyQuestions.vue"),
        props: true,
    },
    {
        path: "/admindashboard/surveyResponses",
        name: "surveyResponse",
        component: () => import("@/views/Admin/SurveyResponses.vue"),
    },
    {
        path: "/:surveyID/surveyForm/respondent/:respondentID",
        name: "respondentSurveyForm",
        component: () => import("@/views/Admin/RespondentSurveyForm.vue"),
    },
    
    {

        path: "/admindashboard/viewResponses/:surveyID",
        name: "viewResponses",
        component: () => import("@/views/Admin/ViewResponses.vue"),
    }
     

]

