import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  const stored = localStorage.getItem('username')
  const username = ref(stored || '')

  function setUsername(name) {
    username.value = name
  }

  watch(username, (val) => {
    localStorage.setItem('username', val)
  })

  return {
    username,
    setUsername
  }
})