// in case we need env var in this file
require('dotenv').config()

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:'stylesheet', type:'text/css', href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
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
    'tachyons/css/tachyons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-plugins'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
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
    strategy: 'prefix_and_default',
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
  dotenv: {
    systemvars: true
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
    extend (config, ctx) {
      config.module.rules.push(
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      )
    }
  }
}
