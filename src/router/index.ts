import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import toolRoutes from './toolRoutes'

const baseRoutes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicyView }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: [...baseRoutes, ...toolRoutes]
})

export default router
