import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: () => import('@/views/Taller3.vue'), },
  
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router