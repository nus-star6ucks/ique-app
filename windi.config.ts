import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
    fontFamily: {
      display: ['Oxygen'],
      body: ['Oxygen'],
    },
  },
})
