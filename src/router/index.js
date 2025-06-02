import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/LandingPageView.vue'
import JobsView from '@/views/job/JobsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/job/JobView.vue'
import AddJobView from '@/views/job/AddJobView.vue'
import EditJobView from '@/views/job/EditJobView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import TwoFactorView from '@/views/auth/TwoFactorView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'landing-page',
      component: LandingPageView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
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
      path: '/profile',
      name: 'user-profile',
      component: UserProfileView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})
export default router
