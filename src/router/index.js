import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import TwoFactorView from '@/views/auth/TwoFactorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/jobs/add',
      name: 'add-job',
      component: AddJobView,
    },
    {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView,
    },
    {
      path: '/twoFactorAuth',
      name: 'two-factor-auth',
      component: TwoFactorView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})
export default router
