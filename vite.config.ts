import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import obfuscator from 'rollup-plugin-obfuscator'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        plugins: [
          obfuscator,
        ],
      },
    },
    minify: 'terser',
    target: 'es2019',
    terserOptions: {
      compress: {
        defaults: false,
      },
    },
  },
  server: {
    proxy: {
      // with options
      '/api': {
        target: 'https://ique.vercel.app/api',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/cf': {
        target: 'https://ique.vercel.app/cf',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/cf/, ''),
      },
    },
  },
  base: '',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [

    WindiCSS(),
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/store',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-pwa
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: 'iQue',
    //     short_name: 'iQue',
    //     theme_color: '#10b981',
    //     icons: [
    //       {
    //         src: '/pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable',
    //       },
    //     ],
    //   },
    // }),

  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },

})
