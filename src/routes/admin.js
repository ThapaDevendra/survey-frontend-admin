export default[

    {
        path: "/admindashboard",
        name: "surveyList",
        component: () => import("@/views/Admin/AdminDashboard.vue"),
    },
    {
        path: "/admindashboard/viewSurvey",
        name: "viewSurvey",
        component: () => import("@/views/Admin/ViewSurvey.vue"),
    },
    {
        path: "/admindashboard/surveyForm/:surveyID",
        name: "newSurveyForm",
        component: () => import("@/views/Admin/createSurveyQuestions.vue"),
        props: true,
    }
]