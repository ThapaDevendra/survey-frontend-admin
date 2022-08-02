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
        path: "/admindashboard/viewResponses/:surveyID",
        name: "viewResponses",
        component: () => import("@/views/Admin/ViewResponses.vue"),
      },
     
]

