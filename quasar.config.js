import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [
      'axios',
      'pinia'
    ],
    css: [
      'app.scss'
    ],
    build: {
      vueRouterMode: 'hash',
    },
    devServer: {
      open: true,
      port: 8090
    },
    framework: {
      iconSet: 'fontawesome-v6',
    },
    animations: 'all',
    extras: [
      'material-icons',
      'mdi-v7',
      'ionicons-v4',
      'eva-icons',
      'fontawesome-v6',
      'themify',
      'line-awesome',
      'bootstrap-icons'
    ]
  }
})