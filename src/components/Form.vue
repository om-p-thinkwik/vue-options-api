<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
      validator: (arr) => arr.every((item) => typeof item === 'string'),
    },
    saveToLocalStorage: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      passwordVisible: false,
    }
  },
  computed: {
    formData: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    handleSubmit() {
      console.log('Form Submit...', this.formData)
      if (this.saveToLocalStorage) {
        localStorage.setItem('user', JSON.stringify(this.formData))
      }
      this.$emit('submitted', this.formData)
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible
    },
  },
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-120">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col justify-center max-w-md w-full p-4 sm:p-6 md:p-8 bg-white shadow-2xl shadow-gray-400 rounded-lg"
    >
      <p class="text-2xl font-semibold text-center text-gray-800 mb-6">
        {{ title }}
      </p>

      <div v-for="field in fields" :key="field" class="mb-4 relative">
        <label :for="field" class="block text-sm font-medium text-gray-700 mb-1">
          {{ field }}
        </label>
        <input
          :type="
            passwordVisible && field === 'Password'
              ? 'text'
              : field === 'Password'
                ? 'password'
                : 'text'
          "
          :id="field"
          :name="field"
          v-model="formData[field]"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
        />

        <!-- Eye icon for password field -->
        <i
          v-if="field === 'Password'"
          :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
          class="absolute right-3 top-9 text-gray-600 cursor-pointer"
          @click="togglePassword"
        ></i>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200"
      >
        {{ buttonName }}
      </button>
      <RouterLink
        v-if="title === 'Sign Up'"
        to="/login"
        class="mt-2 text-blue-500 hover:text-blue-800 self-end"
        >Already Have an account?</RouterLink
      >
    </form>
  </div>
</template>
