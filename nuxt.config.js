// in case we need env var in this file
require('dotenv').config()

const DOMAIN = process.env.DOMAIN || 'summit.g0v.tw'
const ROUTER_BASE = process.env.ROUTER_BASE || ''
const SITE_BASE = `https://${DOMAIN}${ROUTER_BASE}`

// eslint-disable-next-line import/first
import { friendlyHeader } from './utils/crawlerFriendly'

const defaultHeader = friendlyHeader({
  description: 'g0v summit 2020 是 g0v 台灣零時政府社群兩年一次的大聚會，也是全球公民黑客、公民科技的盛會。開源實作、在地連結，summit 2020 要在台南讓虛擬、實體空間間奔走的黑客、貢獻者齊聚一堂，聆聽彼此的故事，用對話了解彼此。',
  coverUrl: '/og.png',
  siteBase: SITE_BASE
})()

export default {
  // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'g0v Summit 2020 台灣零時政府雙年會',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...defaultHeader.meta
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${ROUTER_BASE}/favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${ROUTER_BASE}/favicon-16x16.png` },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap' }
    ]
  },
  router: {
    base: process.env.ROUTER_BASE || '/'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'tachyons/css/tachyons.css',
    // 'buefy/dist/buefy.css'
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: './assets/scss/variables/*.scss'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/sentry',
    '~/plugins/vuex-init',
    '~/plugins/vue-plugins'
  ],
  env: {
    SITE_BASE,
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    APP_RELEASE: process.env.TRAVIS_COMMIT || ''
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    // https://github.com/schlunsen/nuxt-leaflet#setup
    'nuxt-leaflet'
  ],
  i18n: {
    defaultLocale: 'zh',
    vueI18nLoader: true,
    strategy: 'prefix_except_default',
    vueI18n: {
      silentTranslationWarn: true
    },
    lazy: true,
    langDir: 'lang/',
    locales: [
      { code: 'zh', file: 'zh.js' },
      { code: 'en', file: 'en.js' }
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    publicPath: '/nuxt/',
    extend (config, ctx) {
      config.module.rules.push(
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      )
    }
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost'
  }
}
