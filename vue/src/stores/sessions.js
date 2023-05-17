import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    profile: {}
  }),

  actions: {
    setProfile (data) {
      this.profile = data
    }
  },
})
