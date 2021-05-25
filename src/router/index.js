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
    component: () => import(/* webpackChunkName: "about" */ '../views/clearance/index.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
