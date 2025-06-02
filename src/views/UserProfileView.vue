<script>
import Sidebar from '@/components/Sidebar.vue'
import UserProfile from '@/components/UserProfile.vue'
import ChangePassword from '@/components/ChangePassword.vue'

export default {
  name: 'UserProfileView',
  components: {
    Sidebar,
    UserProfile,
    ChangePassword,
  },
  data() {
    return {
      currentComponent: 'UserProfile',
      showSidebar: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSidebar = true
    }, 300)
  },
}
</script>

<template>
  <div class="flex h-screen bg-gray-200">
    <Sidebar
      :visible="showSidebar"
      :activeComponent="currentComponent"
      @changeComponent="currentComponent = $event"
    />

    <div class="flex-1 bg-gray-200 overflow-auto shadow-inner">
      <component :is="currentComponent" />
    </div>
  </div>
</template>
