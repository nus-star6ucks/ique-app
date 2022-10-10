import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'

import 'virtual:windi.css'
import './styles/main.css'
import { useUserStore } from './stores/user'
import { userApi } from './utils'

const pinia = createPinia()

const app = createApp(App)
const head = createHead()

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(pinia)
  const token = useLocalStorage('token', '')

  if (typeof userStore.user === 'undefined' && token.value) {
    userApi.usersGet().then(({ data }) => {
      userStore.setUser(data)
      next()
    }).catch(() => {
      userStore.logout()
      next('/')
    })
    return
  }

  next()
})

app.use(pinia)
app.use(router)
app.use(head)
app.mount('#app')
