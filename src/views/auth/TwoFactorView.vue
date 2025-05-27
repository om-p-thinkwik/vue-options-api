<script>
import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      toast: useToast(),
      loggedInUserName: '',
      loggedInUserData: {},
      userList: [],
      current2faStatus: false,
      qrCodeUrl: '',
      secret: '',
      otpInput: '',
      verificationResult: '',
      isTokenValid: false,
    }
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.loggedInUserName = user?.Username || ''
    const userStore = useUserStore()

    await axios.get('/api/users').then((res) => {
      const users = Array.isArray(res.data) ? res.data : []
      this.userList = users
      userStore.setUsers(users)
      console.log('List of all users...', users)

      this.loggedInUserData = users.find((u) => u.Username === this.loggedInUserName)
      if (this.loggedInUserData) {
        this.current2faStatus = this.loggedInUserData.isTwoFactorEnabled
        this.secret = this.loggedInUserData.twoFactorSecret || ''
      }
    })
  },
  methods: {
    getTOTPInstance(secret) {
      return new OTPAuth.TOTP({
        issuer: 'JobsVue',
        label: this.loggedInUserName,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret),
      })
    },
    async handleTwoFactor() {
      if (!this.loggedInUserData) {
        console.error('User not found')
        return
      }

      if (this.current2faStatus) {
        this.toast('2FA is already enabled. Enter the code from your authenticator app.', {
          timeout: 1500,
          toastClassName: 'custom-toast-info',
        })
        return
      }

      const secretObj = new OTPAuth.Secret()
      const secret = secretObj.base32
      const totp = this.getTOTPInstance(secret)

      this.secret = secret
      const otpauthUrl = totp.toString()

      try {
        this.qrCodeUrl = await QRCode.toDataURL(otpauthUrl)
        this.loggedInUserData.twoFactorSecret = secret
        this.loggedInUserData.isTwoFactorEnabled = true

        await axios.put(`/api/users/${this.loggedInUserData.id}`, this.loggedInUserData)
        this.current2faStatus = true

        this.toast('2FA enabled successfully!', {
          timeout: 1000,
          toastClassName: 'custom-toast-success',
        })
        console.log('Counter', totp.counter())
        console.log('Remaining', totp.remaining())
      } catch (error) {
        console.error('Error during 2FA setup:', error)
        this.toast('Failed to set up 2FA', { timeout: 1500, toastClassName: 'custom-toast-error' })
      }
    },

    verifyToken() {
      if (!this.secret || !this.otpInput) {
        this.verificationResult = 'Missing secret or input'
        this.isTokenValid = false
        this.toast(this.verificationResult, {
          timeout: 1000,
          toastClassName: 'custom-toast-error',
        })
        return
      }

      const totp = this.getTOTPInstance(this.secret)
      const isValid = totp.validate({ token: this.otpInput, window: 0 })
      console.log('Counter', totp.counter())
      console.log('Remaining', totp.remaining())
      if (isValid !== null) {
        this.verificationResult = 'Code is valid!'
        this.isTokenValid = true
        this.toast(this.verificationResult, {
          timeout: 1000,
          toastClassName: 'custom-toast-success',
        })
      } else {
        this.verificationResult = 'Invalid code. Try again.'
        this.isTokenValid = false
        this.toast(this.verificationResult, { timeout: 1000, toastClassName: 'custom-toast-error' })
      }
    },
  },
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
    <h2 class="text-2xl font-semibold mb-4">Two Factor Authentication (2FA)</h2>

    <p class="mb-4 text-lg">
      Current status:
      <span :class="current2faStatus ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
        {{ current2faStatus ? 'Activated' : 'Deactivated' }}
      </span>
    </p>

    <button
      @click="handleTwoFactor"
      class="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
    >
      Enable 2FA
    </button>

    <div v-if="qrCodeUrl" class="mb-6">
      <p class="mb-2 font-medium">Scan this QR code with your authenticator app:</p>
      <img
        :src="qrCodeUrl"
        alt="2FA QR Code"
        class="mx-auto w-48 h-48 rounded border border-gray-300 shadow-sm"
      />
    </div>

    <div v-if="qrCodeUrl || current2faStatus" class="flex flex-col items-center space-y-3">
      <input
        v-model="otpInput"
        type="text"
        maxlength="6"
        placeholder="Enter 6-digit code"
        class="w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono tracking-widest"
        @input="otpInput = otpInput.replace(/\D/g, '').slice(0, 6)"
      />
      <button
        @click="verifyToken"
        :disabled="otpInput.length !== 6"
        :class="[
          'px-6 py-2 rounded text-white font-semibold transition duration-300',
          otpInput.length === 6
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed',
        ]"
      >
        Verify
      </button>
      <p
        v-if="verificationResult"
        :class="['font-semibold mt-2', isTokenValid ? 'text-green-600' : 'text-red-600']"
      >
        {{ verificationResult }}
      </p>
    </div>
  </div>
</template>
