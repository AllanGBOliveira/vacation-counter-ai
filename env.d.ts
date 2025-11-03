/// <reference types="vite/client" />

/**
 * Tipagem para variáveis de ambiente
 * Funciona tanto para import.meta.env quanto para process.env
 */

// Variáveis de ambiente do projeto
interface EnvironmentVariables {
  // Application
  NUXT_PUBLIC_APP_NAME: string
  NUXT_PUBLIC_APP_VERSION: string
  
  // GitHub Pages
  NUXT_PUBLIC_BASE_URL: string
  
  // API Configuration
  NUXT_PUBLIC_API_BASE_URL: string
  NUXT_PUBLIC_API_TIMEOUT: string
  
  // Feature Flags
  NUXT_PUBLIC_ENABLE_ANALYTICS: string
  NUXT_PUBLIC_ENABLE_DEBUG: string
  
  // Analytics (opcional)
  NUXT_PUBLIC_GA_ID?: string
}

// Tipagem para import.meta.env (usado globalmente pelo Vite/Nuxt)
interface ImportMetaEnv extends EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly DEV: boolean
  readonly PROD: boolean
}

// Helper type para garantir que ImportMetaEnv seja reconhecido como usado
type _Env = ImportMetaEnv

// Tipagem para process.env (usado no nuxt.config.ts)
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}

