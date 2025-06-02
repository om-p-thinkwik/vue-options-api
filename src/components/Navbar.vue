<script>
import logo from '@/assets/logo.png'
import { useRoute } from 'vue-router'
export default {
  data() {
    return {
      logo: logo,
      loggedIn: false,
    }
  },
  props: {
    title: {
      type: String,
      default: 'My Website',
    },
  },
  methods: {
    isActiveLink(routePath) {
      const route = useRoute()
      return route.path === routePath
    },
    onLogout() {
      localStorage.removeItem('user')
      this.$router.push('/')
    },
  },
  updated() {
    this.loggedIn = !!localStorage.getItem('user')
  },
}
</script>

<template>
  <nav class="bg-green-700">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/home">
            <img class="h-10 w-auto" v-bind:src="logo" alt="Vue Jobs" />
            <span class="md:block text-white text-2xl font-bold ml-2">{{ title }}</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/home"
                v-if="loggedIn"
                :class="[
                  isActiveLink('/home') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                v-if="loggedIn"
                to="/jobs"
                :class="[
                  isActiveLink('/jobs') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Jobs</RouterLink
              >
              <RouterLink
                to="/jobs/add"
                v-if="loggedIn"
                :class="[
                  isActiveLink('/jobs/add') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Add Job</RouterLink
              >
              <RouterLink
                to="/twoFactorAuth"
                v-if="loggedIn"
                :class="[
                  isActiveLink('/twoFactorAuth')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >2FA</RouterLink
              >
              <RouterLink
                to="/profile"
                v-if="loggedIn"
                :class="[
                  isActiveLink('/profile') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Profile</RouterLink
              >
              <RouterLink
                to="/signup"
                v-if="!loggedIn"
                :class="[
                  isActiveLink('/') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Register</RouterLink
              >
              <button
                v-if="loggedIn"
                class="hover:bg-gray-900 text-white px-3 py-2 rounded-md"
                @click="onLogout()"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
