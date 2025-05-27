import { defineStore } from 'pinia'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
    lastJobId: 0,
  }),
  actions: {
    setJobs(jobs) {
      this.jobs = jobs
      this.lastJobId = jobs.reduce((max, job) => Math.max(max, Number(job.id)), 0)
    },
    getNextJobId() {
      this.lastJobId++
      return this.lastJobId
    },
    addJob(job) {
      this.jobs.push(job)
    },
    deleteJob(id) {
      this.jobs = this.jobs.filter((job) => job.id !== id)
      if (id === this.lastJobId) {
        this.lastJobId = this.jobs.reduce((max, job) => Math.max(max, Number(job.id)), 0)
      }
    },
  },
})
