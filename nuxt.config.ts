// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Configuração para GitHub Pages
  app: {
    // Use process.env no nuxt.config.ts (não import.meta.env)
    baseURL: process.env.NODE_ENV === 'production' 
      ? (process.env.NUXT_PUBLIC_BASE_URL || '/vacation-counter-ai/') 
      : '/',
    buildAssetsDir: 'assets',
    head: {
      title: process.env.NUXT_PUBLIC_APP_NAME || 'Vacation Counter AI',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Contador de férias inteligente' },
      ],
    },
  },

  // Runtime Config - Acesse via useRuntimeConfig() nos componentes
  runtimeConfig: {
    // Privadas (server-side only, build-time em SSG)
    // Essas não estarão disponíveis no client após o build
    // secretBuildToken: process.env.SECRET_BUILD_TOKEN,
    
    // Públicas (acessíveis no client via useRuntimeConfig().public)
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Vacation Counter AI',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || '/vacation-counter-ai/',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
      apiTimeout: parseInt(process.env.NUXT_PUBLIC_API_TIMEOUT || '30000'),
      enableAnalytics: process.env.NUXT_PUBLIC_ENABLE_ANALYTICS === 'true',
      enableDebug: process.env.NUXT_PUBLIC_ENABLE_DEBUG === 'true',
      gaId: process.env.NUXT_PUBLIC_GA_ID,
    }
  },

  // Geração de site estático
  ssr: false, // SPA mode - mude para true se quiser SSR/SSG com hydration

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ]
})