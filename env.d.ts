/// <reference types="vite/client" />

/**
 * Tipagem para variáveis de ambiente
 * Isso fornece autocomplete e type safety ao usar import.meta.env
 */
interface ImportMetaEnv {
  // Application
  readonly NUXT_PUBLIC_APP_NAME: string
  readonly NUXT_PUBLIC_APP_VERSION: string
  
  // GitHub Pages
  readonly NUXT_PUBLIC_BASE_URL: string
  
  // API Configuration
  readonly NUXT_PUBLIC_API_BASE_URL: string
  readonly NUXT_PUBLIC_API_TIMEOUT: string
  
  // Feature Flags
  readonly NUXT_PUBLIC_ENABLE_ANALYTICS: string
  readonly NUXT_PUBLIC_ENABLE_DEBUG: string
  
  // Analytics (opcional)
  readonly NUXT_PUBLIC_GA_ID?: string
  
  // Node environment
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly DEV: boolean
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * Tipagem para process.env (usado no nuxt.config.ts)
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {
      // Adicione variáveis específicas do Node aqui se necessário
    }
  }
}

export {}

