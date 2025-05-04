import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import global from 'global'

const api = axios.create({ baseURL: 'localhost:8080/' })

export default defineBoot(({ app }) => {
  window.global = global

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { api }
