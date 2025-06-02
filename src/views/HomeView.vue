<script>
import people_working from '@/assets/people_working.jpeg'

export default {
  data() {
    return {
      people_working: people_working,
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-white py-20 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Your Next Developer Job is Just One Click Away
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          A dedicated platform where developers discover exciting opportunities and employers find
          top talent.
        </p>
        <router-link to="/signup">
          <button
            class="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-900 transition"
          >
            Get Started - Sign Up
          </button>
        </router-link>
      </div>
    </section>

    <section class="py-12 bg-gray-100">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <img
          :src="people_working"
          alt="Developers at work"
          class="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div class="md:w-1/2 text-gray-700">
          <h2 class="text-2xl font-bold mb-4">Built for Developers and Employers</h2>
          <p class="mb-4">
            Whether you're building your career or your team, our platform helps connect the right
            talent with the right roles.
          </p>
          <ul class="list-disc list-inside space-y-2">
            <li>Curated job listings tailored for developers</li>
            <li>Fast and easy job posting for employers</li>
            <li>Secure and intuitive user experience</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="py-16 bg-green-700 text-white text-center px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Join the Network</h2>
        <p class="mb-6">
          Hundreds of developers and companies trust our platform to hire and get hired. Don't miss
          out.
        </p>
        <router-link to="/signup">
          <button
            class="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Create Your Free Account
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>
