export default[
    {
        path: '/super-admindashboard',
        name: 'adminList',
        component: () => import('@/views/SuperAdmin/AdminList.vue')
    },
    {
        path: '/super-admindashboard/addAdmin',
        name: 'addAdmin',
        component: () => import('@/views/SuperAdmin/AddAdmin.vue')
    },
    {
        path: '/super-admindashboard/viewAdmin',
        name: 'viewAdmin',
        component: () => import('@/views/SuperAdmin/AddAdmin.vue')
    },
    {
        path: '/super-admindashboard/editAdmin/:id',
        name: 'edit',
        component: () => import('@/views/SuperAdmin/EditAdmin.vue')
    }
]