import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import { initializeApp } from 'firebase/app'
import App from './App.vue'

import 'virtual:windi.css'
import './styles/main.css'

// initializeApp({
//   apiKey: import.meta.env.FIREBASE_API_KEY,
//   authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDERID,
//   appId: import.meta.env.FIREBASE_APP_ID,
// })

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
