<script>
import Form from '@/components/common/Form.vue'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { toRaw } from 'vue'
import { useToast } from 'vue-toastification'

export default {
  components: {
    Form,
  },
  data() {
    return {
      userList: [],
      toast: useToast(),
      items: ['Username', 'Password'],
      formValues: {},
    }
  },
  methods: {
    async handleFormSubmission(data) {
      console.log('Received form data in SignUp parent:', data)
      const userStore = useUserStore()
      const newUser = structuredClone(toRaw(this.formValues))

      newUser.Username = newUser.Username?.trim()
      newUser.Password = newUser.Password?.trim()
      newUser.isTwoFactorEnabled = false
      newUser.twoFactorSecret = ''
      newUser.email = ''
      newUser.phone = ''
      newUser.age = ''
      newUser.experience = ''
      newUser.interestFields = ''

      if (!newUser.Username || !newUser.Password) {
        this.toast('Username and password cannot be empty', {
          timeout: 1000,
          toastClassName: 'custom-toast-error',
        })
        return
      }

      try {
        const res = await axios.get('/api/users')
        this.userList = Array.isArray(res.data) ? res.data : []
        console.log('users list from db...', this.userList)

        const userExists = this.userList.find(
          (user) => user.Username === newUser.Username && user.Password === newUser.Password
        )
        const usernameTaken = this.userList.find((user) => user.Username === newUser.Username)

        if (userExists) {
          this.toast('User already exists. Try logging in...', {
            timeout: 1000,
            toastClassName: 'custom-toast-error',
          })
          this.$router.push('/login')
          return
        }

        if (usernameTaken) {
          this.toast('Username is already taken', {
            timeout: 1000,
            toastClassName: 'custom-toast-error',
          })
          return
        }

        newUser.id = userStore.getNextUserId()
        console.log('New id:', newUser.id)
        const resp = await axios.post('/api/users', newUser)

        if (resp.status === 201) {
          userStore.addUser(newUser)
          this.toast('User sign-up successful!', {
            timeout: 1000,
            toastClassName: 'custom-toast-success',
          })
          this.$router.push('/login')
        } else {
          throw new Error('User not created')
        }
      } catch (error) {
        console.error('Signup error:', error)
        this.toast('Error registering user', {
          timeout: 1000,
          toastClassName: 'custom-toast-error',
        })
      }
    },
  },
  async created() {
    const userStore = useUserStore()
    if (userStore.users.length === 0) {
      const res = await axios.get('/api/users')
      userStore.setUsers(res.data)
    }
  },
}
</script>

<template>
  <div>
    <Form
      :fields="items"
      :title="'Sign Up'"
      :save-to-local-storage="false"
      :buttonName="'Sign Up'"
      v-model="formValues"
      @submitted="handleFormSubmission"
    />
  </div>
</template>
