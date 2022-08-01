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
    }
]