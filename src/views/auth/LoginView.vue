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
            this.toast('Login Successful', {
              timeout: 1000,
              toastClassName: 'custom-toast-success',
            })
            this.$router.push('/home')
          } else {
            this.toast('Login unsuccessful', {
              timeout: 1000,
              toastClassName: 'custom-toast-error',
            })
          }
        }
      } catch (error) {
        this.toast('Some error in Login', { timeout: 1000, toastClassName: 'custom-toast-error' })
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
      :save-to-local-storage="true"
      v-model="formValues"
      @submitted="handleFormSubmission"
    />
  </div>
</template>
