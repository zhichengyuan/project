import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home'),
      },
      {
        path: '/logQuery',
        name: 'logQuery',
        component: () => import(/* webpackChunkName: "about" */ '../views/logQuery')
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: () => import(/* webpackChunkName: "about" */ '../views/Terms/privacy')
      },
      
    ]

    
  },
  {
    path: '/clearance',
    name: 'clearance',
    component: () => import(/* webpackChunkName: "about" */ '../views/clearance/index.vue'),
    redirect:'clearanceUpload',
    children: [
      {
        path: '/clearanceUpload',
        name: 'clearanceUpload',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/clearanceUpload.vue'),
      },
      {
        path: '/generateExcel',
        name: 'generateExcel',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/generateExcel.vue'),
      },
      {
        path: '/queryList',
        name: 'queryList',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/queryList.vue'),
      },
      {
        path: '/checkList',
        name: 'checkList',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/checkList.vue'),
      },
      {
        path: '/generateChinaD',
        name: 'generateChinaD',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/generateChinaD.vue'),
      },
      {
        path: '/generateLogisticsfile',
        name: 'generateLogisticsfile',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/generateLogisticsfile.vue'),
      },
      {
        path: '/contrast',
        name: 'contrast',
        component: () => import(/* webpackChunkName: "about" */ '../views/clearance/contrast.vue'),
      },
      
      
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
