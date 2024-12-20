// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Jhonny Carpenito',
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-aos', '@nuxtjs/tailwindcss']
})