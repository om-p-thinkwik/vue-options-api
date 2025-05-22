const jobs = require('./jobs.json')
const users = require('./users.json')

module.exports = () => ({
  jobs: jobs,
  users: users,
})
