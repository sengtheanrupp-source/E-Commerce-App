// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Auto-import components from ~/components (no path prefix)
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

runtimeConfig: {
  nodemailer: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '2525'),
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  },
  mailFrom: '"E-Commerce App" <noreply@ecommerceapp.com>',
},

  modules: [
    '@nuxtjs/tailwindcss',
    '@prisma/nuxt',
    '@pinia/nuxt',
  ],
})
