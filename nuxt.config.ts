export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-first-nuxt-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/amplify.js', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/onesignal', '@nuxtjs/pwa'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pwa: {
    manifest: {
      name: 'My First Nuxt App',
      short_name: 'MFNA',
      useWebmanifestExtension: false,
    },
    meta: {
      ogType: 'website',
      ogSiteName: 'My First Nuxt App',
      ogTitle: 'My First Nuxt App - Top',
      ogDescription: 'A website created for personal practice for Nuxt.js etc.',
      ogHost: process.env.BASE_URL,
      ogImage: true,
      twitterCard: 'summary',
    },
    workbox: {
      preCaching: ['/example.json'],
    },
  },
  oneSignal: {
    init: {
      appId: 'f7592648-dab6-41ae-8f13-6a44e0465684',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },
}
