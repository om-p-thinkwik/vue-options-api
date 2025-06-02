<script>
import Hero from '@/components/Hero.vue'
import HomeCards from '@/components/job/HomeCards.vue'
import JobListings from '@/components/job/JobListings.vue'

export default {
  components: {
    Hero,
    HomeCards,
    JobListings,
  },
}
</script>

<template>
  <Hero heading="Welcome to Oms Jobs" sub-heading="Find the job that fits your skills and needs" />
  <HomeCards />
  <JobListings :showButton="true" />
</template>
