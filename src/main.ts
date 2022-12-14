import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import OneSignalVuePlugin from '@onesignal/onesignal-vue3'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

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

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'ique.vercel.app', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
})

app.use(pinia)
app.use(router)
app.use(head)
app.use(OneSignalVuePlugin, {
  appId: import.meta.env.VITE_ONESINGAL_APP_ID,
})
app.mount('#app')
