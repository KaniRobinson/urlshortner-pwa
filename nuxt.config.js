require('dotenv').config()

export default {
  /**
   * Set generate configuraiton
   * Doc: https://nuxtjs.org/guide/routing#spa-fallback
   */
  generate: {
    fallback: true
  },

  /**
   * Set environment configuraiton
   * Doc: https://nuxtjs.org/api/configuration-env/
   */
  env: {
    API_URI: process.env.API_URI,
  },

  /**
   * Set head configuraiton
   * Doc: https://nuxtjs.org/api/configuration-head/
   */
  head: {

    title: 'Url Shortner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' },
    ]
  },

  /**
   * Global CSS
   */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /**
   * Set mode configuration
   * Doc: https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',

  /**
   * Set loading configuration
   * Doc: https://nuxtjs.org/api/configuration-loading
   */
  loading: {
    color: '#3B8070'
  },

  /**
   * Set modules configuration
   * Doc: https://nuxtjs.org/api/configuration-modules
   */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],

  /**
   * Set plugins configuration
   * Doc: https://nuxtjs.org/api/configuration-plugins
   */
  plugins: [
    '~plugins/axios',
    '~plugins/veevalidate',
  ],

  axios: {
    baseURL: process.env.API_URI,
    debug: true,
  },

  /**
   * Set build configuration
   * Doc: https://nuxtjs.org/api/configuration-build
   */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },

    /**
     * You can extend webpack config here
     */
    extend(config, ctx) {
      //
    }
  }
}
