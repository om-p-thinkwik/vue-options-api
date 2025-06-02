<script>
export default {
  name: 'Sidebar',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    activeComponent: {
      type: String,
      default: '',
    },
  },
  methods: {
    change(componentName) {
      this.$emit('changeComponent', componentName)
    },
  },
}
</script>

<template>
  <transition name="slide">
    <aside
      v-if="visible"
      class="w-72 bg-gradient-to-b from-green-700 to-green-950 text-white h-full p-6 shadow-xl flex flex-col space-y-6 rounded-tr-3xl rounded-br-3xl"
    >
      <h2 class="text-2xl font-bold mb-4 tracking-wide">My Dashboard</h2>

      <nav class="flex flex-col space-y-3">
        <button
          @click="change('UserProfile')"
          :class="[
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300',
            activeComponent === 'UserProfile'
              ? 'bg-white text-green-700 font-semibold shadow-md'
              : 'hover:bg-green-950',
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.387 0 4.608.557 6.637 1.542M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          User Profile
        </button>

        <button
          @click="change('ChangePassword')"
          :class="[
            'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300',
            activeComponent === 'ChangePassword'
              ? 'bg-white text-green-700 font-semibold shadow-md'
              : 'hover:bg-green-950',
          ]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11c0-1.105.895-2 2-2s2 .895 2 2m-4 0a2 2 0 00-4 0v1a2 2 0 00-2 2v5h12v-5a2 2 0 00-2-2v-1a4 4 0 10-8 0z"
            />
          </svg>
          Change Password
        </button>
      </nav>
    </aside>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
