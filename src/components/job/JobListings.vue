<script>
import JobListing from '../Job/JobListing.vue'
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  data() {
    return {
      searchInput: '',
      jobs: [],
      isLoading: true,
    }
  },
  components: {
    JobListing,
    PulseLoader,
  },
  props: {
    showButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredJobs() {
      const term = this.searchInput.toLowerCase()
      return this.jobs.filter((job) => job.title.toLowerCase().includes(term))
    },
  },
  async mounted() {
    try {
      const response = await axios.get('/api/jobs')
      this.jobs = response.data
    } catch (error) {
      console.error('Error fetching jobs', error)
    } finally {
      this.isLoading = false
    }
  },
}
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mx-5">
        <h2 class="text-3xl font-bold text-green-500 mb-4 md:mb-0">Browse Jobs</h2>

        <div class="relative w-full md:w-1/3">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="pi pi-search text-gray-400"></i>
          </span>
          <input
            type="text"
            id="search"
            name="search"
            v-model="searchInput"
            placeholder="Search jobs..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      <div v-if="isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
      <div v-else class="m-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in filteredJobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Jobs
    </RouterLink>
  </section>
</template>
