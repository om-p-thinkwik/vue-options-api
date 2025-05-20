<script>
export default {
  props: {
    bg: {
      type: String,
      default: 'bg-blue-100',
    },
  },
}
</script>

<template>
  <div v-bind:class="`${bg} p-6 rounded-lg shadow-md`">
    <slot></slot>
  </div>
</template>
