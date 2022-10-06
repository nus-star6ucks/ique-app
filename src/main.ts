import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'

import 'virtual:windi.css'
import './styles/main.css'

const pinia = createPinia()

const app = createApp(App)
const head = createHead()

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(pinia)
app.use(router)
app.use(head)
app.mount('#app')
