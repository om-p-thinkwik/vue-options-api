<script>
import Form from '@/components/Form.vue'
import { useToast } from 'vue-toastification'

export default {
  components: {
    Form,
  },
  data() {
    return {
      toast: useToast(),
      items: ['Username', 'Password'],
      formValues: {},
    }
  },
  methods: {
    handleFormSubmission(data) {
      console.log('Received form data in Login parent:', data)
      try {
        if (localStorage.getItem('user')) {
          const signedUpUser = JSON.parse(localStorage.getItem('user'))
          if (signedUpUser.Username === data.Username && signedUpUser.Password === data.Password) {
            this.toast.success('Login Successful', { timeout: 2000 })
            this.$router.push('/home')
          } else {
            this.toast.error('Login unsuccessful', { timeout: 2000 })
          }
        }
      } catch (error) {
        this.toast.error('Some error in Login', { timeout: 2000 })
      }
    },
  },
}
</script>

<template>
  <div>
    <Form
      :fields="items"
      title="Login"
      buttonName="Login"
      :save-to-local-storage="false"
      v-model="formValues"
      @submitted="handleFormSubmission"
    />
  </div>
</template>
