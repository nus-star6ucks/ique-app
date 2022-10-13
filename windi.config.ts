import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  attributify: true,
  important: true,
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
    },
  },
})
