<script>
export default {
  name: 'Hero',
  props: {
    heading: {
      type: String,
      default: 'Default heading',
    },
    subHeading: {
      type: String,
      default: 'Default Subheading',
    },
  },
}
</script>
<template>
  <section class="bg-green-900 py-20 mb-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          {{ heading }}
        </h1>
        <p class="my-4 text-xl text-white">{{ subHeading }}</p>
      </div>
    </div>
  </section>
</template>
