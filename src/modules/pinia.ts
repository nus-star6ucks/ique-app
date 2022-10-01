import { createPinia } from 'pinia'
import { type UserModule } from '~/types'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ initialState, app }) => {
  const pinia = createPinia()
  app.use(pinia)
  initialState.pinia = pinia.state.value
}
