import MainLayout from 'src/layouts/MainLayout.vue'
import LoginPage from 'src/pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/chat',
    component: MainLayout,
    children: [
      { path: '', component: () => import('pages/ChatPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes