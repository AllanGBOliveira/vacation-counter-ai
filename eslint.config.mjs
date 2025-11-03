// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.d.ts'],
    rules: {
      // Desabilita regra com bug conhecido em arquivos de definição de tipos
      // https://github.com/typescript-eslint/typescript-eslint/issues/...
      '@typescript-eslint/unified-signatures': 'off',
    },
  },
)
