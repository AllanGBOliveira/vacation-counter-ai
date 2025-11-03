/**
 * Composable para acessar configurações da aplicação
 * Wrapper tipado em volta de useRuntimeConfig() para melhor DX
 * 
 * @example
 * ```ts
 * const appConfig = useAppConfig()
 * console.log(appConfig.app.name)
 * console.log(appConfig.api.baseUrl)
 * console.log(appConfig.features.debug)
 * ```
 */
export const useAppConfig = () => {
  const config = useRuntimeConfig()
  
  return {
    /**
     * Informações da aplicação
     */
    app: {
      name: config.public.appName,
      version: config.public.appVersion,
      baseUrl: config.public.baseUrl,
    },
    
    /**
     * Configurações da API
     */
    api: {
      baseUrl: config.public.apiBaseUrl,
      timeout: config.public.apiTimeout,
      
      /**
       * Helper para criar URL completa da API
       * @param endpoint - Endpoint da API (ex: '/users', '/vacations')
       * @returns URL completa
       */
      url: (endpoint: string): string => {
        const base = config.public.apiBaseUrl.replace(/\/$/, '')
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
        return `${base}${path}`
      },
    },
    
    /**
     * Feature flags
     */
    features: {
      analytics: config.public.enableAnalytics,
      debug: config.public.enableDebug,
      gaId: config.public.gaId,
    },
    
    /**
     * Informações de ambiente
     */
    env: {
      isDevelopment: import.meta.dev,
      isProduction: !import.meta.dev,
      // Também disponível via import.meta.env
      get mode() {
        return import.meta.env.MODE
      },
    },
  }
}

/**
 * Type helper para o retorno do useAppConfig
 */
export type AppConfig = ReturnType<typeof useAppConfig>

