/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NUXT_PUBLIC_APP_NAME: string
  readonly NUXT_PUBLIC_APP_VERSION: string
  readonly NUXT_PUBLIC_BASE_URL: string
  readonly NUXT_PUBLIC_API_BASE_URL: string
  readonly NUXT_PUBLIC_API_TIMEOUT: string
  readonly NUXT_PUBLIC_ENABLE_ANALYTICS: string
  readonly NUXT_PUBLIC_ENABLE_DEBUG: string
  readonly NUXT_PUBLIC_GA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
