import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    lastUserId: 0,
  }),
  actions: {
    setUsers(users) {
      this.users = users
      this.lastUserId = users.reduce((max, user) => Math.max(max, user.id), 0)
    },
    getNextUserId() {
      this.lastUserId++
      return this.lastUserId
    },
    addUser(user) {
      this.users.push(user)
    },
    getUserByUserName(username) {
      return this.users.find((user) => user.userName === username)
    },
  },
})
