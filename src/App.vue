<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<template>
  <Navbar title="Om's Jobs" />
  <RouterView />
</template>
