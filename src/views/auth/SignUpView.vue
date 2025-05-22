<script>
import Form from '@/components/Form.vue'

export default {
  components: {
    Form,
  },
  data() {
    return {
      items: ['Username', 'Password'],
      formValues: {},
    }
  },
  methods: {
    handleFormSubmission(data) {
      console.log('Received form data in SignUp parent:', data)
      this.$router.push('/login')
    },
  },
}
</script>

<template>
  <div>
    <Form
      :fields="items"
      :title="'Sign Up'"
      :save-to-local-storage="true"
      :buttonName="'Sign Up'"
      v-model="formValues"
      @submitted="handleFormSubmission"
    />
  </div>
</template>
