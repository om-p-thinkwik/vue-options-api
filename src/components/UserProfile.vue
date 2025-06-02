<script>
import axios from 'axios'

export default {
  name: 'SimpleForm',
  data() {
    return {
      userList: [],
      currentUser: '',
      twoFAStatus: '',
      phoneInput: '',
      form: {
        Username: '',
        email: '',
        phone: '',
        age: '',
        experience: '',
        interestFields: '',
      },
    }
  },
  watch: {
    phoneInput(newVal) {
      this.form.phone = newVal
    },
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.form.email || !this.form.phone || !this.form.age) {
          alert('Please fill in all required fields.')
          return
        }
        const res = await axios.patch(`/api/users/${this.currentUser.id}`, this.form)
        console.log('Response...', res)
      } catch (error) {
        console.error('Error submitting profile', error)
      }
      console.log('Form submitted:', this.form)
    },
  },
  async created() {
    console.log('Phone input set to:', this.phoneInput)

    try {
      const res = await axios.get('/api/users')
      this.userList = Array.isArray(res.data) ? res.data : []

      const loggedInUser = JSON.parse(localStorage.getItem('user'))
      if (loggedInUser) {
        this.currentUser = this.userList.find((user) => user.Username === loggedInUser.Username)

        if (this.currentUser) {
          this.form.Username = this.currentUser.Username
          this.form.email = this.currentUser.email || ''
          this.form.phone = this.currentUser.phone || ''
          this.form.age = this.currentUser.age || ''
          this.form.experience = this.currentUser.experience || ''
          this.form.interestFields = this.currentUser.interestFields || ''

          this.twoFAStatus = this.currentUser.isTwoFactorEnabled ? 'Enabled' : 'Disabled'
          this.phoneInput = this.form.phone
        }

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
      <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Profile</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="form.Username"
              type="text"
              readonly
              class="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
            <vue-tel-input
              v-model="phoneInput"
              mode="international"
              :inputoptions="{ showDialCode: true }"
              :preferred-countries="['in', 'us']"
              :auto-default-country="false"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Two Factor Authentication Status</label
            >
            <input
              v-model="twoFAStatus"
              type="text"
              readonly
              class="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Age</label>
            <input
              v-model="form.age"
              type="number"
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700"
              >Experience (in years)</label
            >
            <input
              v-model="form.experience"
              type="number"
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">Fields of Interest</label>
            <textarea
              v-model="form.interestFields"
              rows="2"
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
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
