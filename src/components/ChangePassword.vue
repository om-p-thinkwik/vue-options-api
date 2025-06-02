<script>
import { useToast } from 'vue-toastification'
import axios from 'axios'

export default {
  data() {
    return {
      toast: useToast(),
      userList: [],
      currentUser: {},
      currentPasswordVisible: false,
      newPasswordVisible: false,
      confirmPasswordVisible: false,
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      console.log('Form submitted', this.form)
      if (this.form.confirmPassword !== this.form.newPassword) {
        this.toast('New password and confirm password should match', {
          timeout: 1000,
          toastClassName: 'custom-toast-error',
        })
        return
      }
      if (this.currentUser) {
        if (this.currentUser.Password !== this.form.currentPassword) {
          this.toast('Current password does not match entered value', {
            timeout: 1000,
            toastClassName: 'custom-toast-error',
          })
          return
        }
        const res = await axios.patch(`/api/users/${this.currentUser.id}`, {
          Password: this.form.newPassword,
        })
        this.toast('Password changed successfully', {
          timeout: 1000,
          toastClassName: 'custom-toast-success',
        })
        this.$router.push('/')
      }
    },
    toggleCurrentPassword() {
      this.currentPasswordVisible = !this.currentPasswordVisible
    },
    toggleNewPassword() {
      this.newPasswordVisible = !this.newPasswordVisible
    },
    toggleConfirmPassword() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible
    },
  },
  async created() {
    try {
      const res = await axios.get('/api/users')
      this.userList = Array.isArray(res.data) ? res.data : []
      const loggedInUser = JSON.parse(localStorage.getItem('user'))
      if (loggedInUser) {
        this.currentUser = this.userList.find((user) => user.Username === loggedInUser.Username)
        console.log('Current User:', this.currentUser)
      }
      console.log('User list from DB:', this.userList)
    } catch (error) {
      console.error('Error in userprofile:', error)
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-200 flex items-center justify-center py-10">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Change Password</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Current Password</label>
            <div class="relative">
              <input
                v-model="form.currentPassword"
                :type="currentPasswordVisible ? 'text' : 'password'"
                class="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
              <i
                :class="currentPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                @click="toggleCurrentPassword"
              ></i>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <div class="relative">
              <input
                v-model="form.newPassword"
                :type="newPasswordVisible ? 'text' : 'password'"
                class="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
              <i
                :class="newPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                @click="toggleNewPassword"
              ></i>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="confirmPasswordVisible ? 'text' : 'password'"
                class="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
              <i
                :class="confirmPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                @click="toggleConfirmPassword"
              ></i>
            </div>
          </div>
        </div>

        <div class="pt-4 text-center">
          <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
