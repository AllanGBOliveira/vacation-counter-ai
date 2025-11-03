# 🏖️ Vacation Counter AI

Um contador de férias inteligente construído com Nuxt 4 e implantado no GitHub Pages.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Desenvolvimento](#-desenvolvimento)
  - [Desenvolvimento Local (sem Docker)](#desenvolvimento-local-sem-docker)
  - [Desenvolvimento com Docker](#desenvolvimento-com-docker)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [Configuração Local](#configuração-local)
  - [Usar nos Componentes](#usar-nos-componentes)
  - [Configurar no GitHub Actions](#configurar-no-github-actions)
- [Deploy](#-deploy)
- [Fluxo de Trabalho](#-fluxo-de-trabalho)
- [Proteção da Branch Main](#-proteção-da-branch-main)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## 🚀 Tecnologias

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **UI:** [@nuxt/ui](https://ui.nuxt.com/)
- **Imagens:** [@nuxt/image](https://image.nuxt.com/)
- **Scripts:** [@nuxt/scripts](https://scripts.nuxt.com/)
- **Linting:** [ESLint](https://eslint.org/) com [@nuxt/eslint](https://eslint.nuxt.com/)
- **TypeScript:** Full type safety
- **Deploy:** GitHub Pages (SSG)
- **CI/CD:** GitHub Actions

## 💻 Desenvolvimento

### Desenvolvimento Local (sem Docker)

#### Pré-requisitos

- Node.js LTS (20+)
- npm, pnpm, yarn ou bun

#### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

#### Comandos Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção (SSR)
npm run generate     # Gera site estático (SSG)
npm run preview      # Preview do build de produção
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint automaticamente
npm run typecheck    # Verifica tipos TypeScript
npm run deploy       # Gera build + adiciona .nojekyll
```

### Desenvolvimento com Docker

#### Pré-requisitos

- Docker
- Docker Compose

#### Comandos Docker

```bash
# Iniciar ambiente de desenvolvimento
docker-compose up nuxt-dev

# Iniciar em background
docker-compose up -d nuxt-dev

# Preview do build de produção
docker-compose up nuxt-preview

# Parar containers
docker-compose down

# Reinstalar dependências (se adicionar novos pacotes)
docker-compose down -v  # Remove volumes
docker-compose up nuxt-dev  # Reinstala tudo
```

#### URLs

- **Desenvolvimento:** `http://localhost:3000`
- **Preview/Produção:** `http://localhost:3001`

#### Dicas Docker

- ✅ O hot-reload funciona automaticamente
- ✅ `node_modules` é gerenciado dentro do container via volume
- ✅ Mudanças no código são refletidas instantaneamente
- ✅ Usa imagem `node:lts-alpine` diretamente (sem Dockerfile customizado)
- ✅ `npm install` roda automaticamente na primeira vez
- ✅ Para adicionar novas dependências:
  ```bash
  # Opção 1: Adicionar no package.json e reiniciar
  docker-compose restart nuxt-dev
  
  # Opção 2: Rodar diretamente no container
  docker-compose exec nuxt-dev npm install <package>
  
  # Opção 3: Parar, limpar volumes e reiniciar
  docker-compose down -v && docker-compose up nuxt-dev
  ```

## 🔐 Variáveis de Ambiente

Este projeto usa variáveis de ambiente para configuração flexível e segura.

### Configuração Local

#### 1. Criar arquivo `.env`

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar com seus valores
nano .env  # ou use seu editor preferido
```

#### 2. Variáveis Disponíveis

Veja `.env.example` para todas as variáveis disponíveis:

```bash
# Application
NUXT_PUBLIC_APP_NAME=Vacation Counter AI
NUXT_PUBLIC_APP_VERSION=1.0.0

# GitHub Pages (atualize com seu repositório)
NUXT_PUBLIC_BASE_URL=/vacation-counter-ai/

# API Configuration
NUXT_PUBLIC_API_BASE_URL=https://api.example.com
NUXT_PUBLIC_API_TIMEOUT=30000

# Feature Flags
NUXT_PUBLIC_ENABLE_ANALYTICS=false
NUXT_PUBLIC_ENABLE_DEBUG=true

# Analytics (opcional)
# NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 3. Tipagem TypeScript

O arquivo `env.d.ts` fornece autocomplete e type safety:

```typescript
// Você tem autocomplete em:
import.meta.env.NUXT_PUBLIC_APP_NAME // ✅ TypeScript sabe que existe
process.env.NUXT_PUBLIC_APP_NAME     // ✅ TypeScript sabe que existe
```

### Usar nos Componentes

#### Forma 1: useAppConfig() - RECOMENDADO

```vue
<script setup lang="ts">
// ✅ Melhor forma - composable tipado
const appConfig = useAppConfig()

console.log(appConfig.app.name)       // "Vacation Counter AI"
console.log(appConfig.api.baseUrl)    // "https://api.example.com"
console.log(appConfig.features.debug) // true/false

// Helper para URLs da API
const apiUrl = appConfig.api.url('/vacations') // https://api.example.com/vacations
</script>

<template>
  <div>
    <h1>{{ appConfig.app.name }} v{{ appConfig.app.version }}</h1>
    <p v-if="appConfig.features.debug">🐛 Debug mode enabled</p>
  </div>
</template>
```

#### Forma 2: useRuntimeConfig()

```vue
<script setup lang="ts">
// ✅ Forma nativa do Nuxt
const config = useRuntimeConfig()

console.log(config.public.appName)
console.log(config.public.apiBaseUrl)
</script>
```

#### Forma 3: import.meta.env

```vue
<script setup lang="ts">
// ⚠️ Funciona, mas valores são fixos em build-time
const appName = import.meta.env.NUXT_PUBLIC_APP_NAME
const isDev = import.meta.env.DEV
</script>
```

### Usar no nuxt.config.ts

```typescript
// ⚠️ No nuxt.config.ts use process.env (não import.meta.env)
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/vacation-counter-ai/'
  }
})
```

### Configurar no GitHub Actions

#### 1. Adicionar Variáveis no GitHub

1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Aba **Variables** → **New repository variable**
3. Adicione as variáveis:

| Name | Value | Descrição |
|------|-------|-----------|
| `APP_NAME` | `Vacation Counter AI` | Nome da aplicação |
| `APP_VERSION` | `1.0.0` | Versão atual |
| `BASE_URL` | `/vacation-counter-ai/` | Base URL para GitHub Pages |
| `API_BASE_URL` | `https://api.example.com` | URL da API (se tiver) |
| `ENABLE_ANALYTICS` | `false` | Habilitar analytics |
| `ENABLE_DEBUG` | `false` | Debug mode (false em prod) |

#### 2. Para Secrets Sensíveis

1. Aba **Secrets** → **New repository secret**
2. Adicione secrets como tokens de API, etc.

**⚠️ IMPORTANTE:**
- **Variables** são para valores públicos (vão para o bundle do client)
- **Secrets** são para valores privados (apenas build-time)

### Variáveis Públicas vs Privadas

#### ✅ Seguro expor (públicas - NUXT_PUBLIC_*)

```bash
NUXT_PUBLIC_API_BASE_URL=https://api.example.com  # ✅ OK
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX                    # ✅ OK
NUXT_PUBLIC_APP_NAME=My App                       # ✅ OK
```

Essas variáveis vão para o bundle JavaScript e são visíveis no browser.

#### ❌ NUNCA expor (privadas)

```bash
SECRET_API_KEY=super-secret-key          # ❌ NUNCA use no client
DATABASE_PASSWORD=senha123               # ❌ NUNCA exponha
PRIVATE_TOKEN=abc123                     # ❌ Use apenas build-time
```

**Para secrets reais:** Use um backend intermediário ou OAuth flow.

### Docker e Variáveis de Ambiente

O `docker-compose.yml` carrega automaticamente o `.env`:

```bash
# Desenvolvimento com .env carregado
docker-compose up nuxt-dev

# Suas variáveis do .env estarão disponíveis no container
```

## 🚀 Deploy

### Deploy Automático

O projeto usa GitHub Actions para deploy automático. **O deploy acontece APENAS quando há merge na branch `main`.**

#### Processo Automático

1. **Push/Merge na `main`** → Dispara workflow de deploy
2. **GitHub Actions:**
   - Instala dependências
   - Roda type check
   - Gera build estático (`npm run generate`)
   - Adiciona arquivo `.nojekyll`
   - Faz upload para GitHub Pages
3. **Site atualizado** em ~2-5 minutos

#### Configuração Inicial do GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Pronto! Os deploys serão automáticos após merge na `main`

### Deploy Manual (opcional)

Se precisar fazer deploy manual:

```bash
# Gerar build estático
npm run deploy

# O resultado estará em .output/public/
```

## 🔄 Fluxo de Trabalho

### 1. Criar Feature Branch

```bash
# Criar e mudar para nova branch
git checkout -b feature/nome-da-feature

# Desenvolver com Docker
docker-compose up nuxt-dev
```

### 2. Fazer Commits

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

### 3. Push da Branch

```bash
git push origin feature/nome-da-feature
```

### 4. Abrir Pull Request

1. Vá ao GitHub e abra um PR de `feature/nome-da-feature` → `main`
2. **Checks automáticos serão executados:**
   - ✅ Lint Check
   - ✅ Type Check
   - ✅ Build Test
   - ✅ PR Preview Build

### 5. Code Review

- Aguarde aprovação de outro desenvolvedor
- Responda comentários e faça ajustes se necessário
- Todos os checks devem passar (✅)

### 6. Merge

- Após aprovação, faça merge do PR
- **Deploy automático será iniciado**
- Site atualizado em alguns minutos

### Fluxo Visual

```
┌─────────────────────────────────────────────────────────────┐
│ Developer Local (Docker)                                     │
│ docker-compose up nuxt-dev                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
          ┌────────────────────────┐
          │ git push origin feature │
          └────────────┬───────────┘
                       │
                       ▼
      ┌────────────────────────────────┐
      │ GitHub - Pull Request Aberto   │
      └────────┬───────────────────────┘
               │
               ▼
   ┌───────────────────────────────┐
   │ GitHub Actions - CI Checks    │
   │ ✓ Lint                        │
   │ ✓ Type Check                  │
   │ ✓ Build Test                  │
   │ ✓ PR Preview                  │
   └───────────┬───────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Code Review  │
        └──────┬───────┘
               │
               ▼
         ┌──────────┐
         │ Aprovado │
         └────┬─────┘
              │
              ▼
      ┌──────────────┐
      │ Merge to Main│
      └──────┬───────┘
             │
             ▼
┌────────────────────────────────┐
│ GitHub Actions - Deploy        │
│ 1. Install dependencies        │
│ 2. npm run generate            │
│ 3. Add .nojekyll               │
│ 4. Upload to GitHub Pages      │
└────────────┬───────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ 🎉 Site Atualizado │
    │ https://...        │
    └────────────────────┘
```

## 🛡️ Proteção da Branch Main

Para garantir qualidade e evitar pushes diretos na `main`, configure proteções:

### Configuração no GitHub

1. **Settings** → **Branches** → **Add branch protection rule**
2. Branch name pattern: `main`
3. Configure as seguintes opções:

#### ✅ Proteções Obrigatórias

- **Require a pull request before merging**
  - Require approvals: 1 (ou mais)
  - Dismiss stale pull request approvals when new commits are pushed
  
- **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks required:
    - `Lint Check`
    - `Type Check`
    - `Build Test`
  
- **Require conversation resolution before merging**
  
- **Do not allow bypassing the above settings**

#### ❌ Opcional

- Allow force pushes (apenas para emergências)
- Allow deletions

### O que a Proteção Impede

- ❌ Push direto na `main`
- ❌ Merge sem aprovação
- ❌ Merge com checks falhando
- ❌ Merge com conversas não resolvidas

### O que a Proteção Permite

- ✅ PRs com revisão adequada
- ✅ Merge após todos os checks passarem
- ✅ Deploy automático de código validado

## 📁 Estrutura do Projeto

```
vacation-counter-ai/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Checks de CI em PRs e main
│       ├── deploy.yml       # Deploy automático para GitHub Pages
│       └── pr-preview.yml   # Preview build em PRs
├── app/
│   └── app.vue              # Componente principal
├── composables/
│   └── useAppConfig.ts      # Composable para variáveis de ambiente
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── .dockerignore            # Arquivos ignorados pelo Docker
├── .env.example             # Template de variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
├── docker-compose.yml       # Configuração Docker Compose (usa node:lts-alpine)
├── env.d.ts                 # Tipagem TypeScript para variáveis de ambiente
├── eslint.config.mjs        # Configuração ESLint
├── nuxt.config.ts           # Configuração Nuxt
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
└── README.md                # Este arquivo
```

## 📝 Sobre o `.nojekyll`

O arquivo `.nojekyll` é criado automaticamente durante o build e deploy. Ele informa ao GitHub Pages para **não processar o site com Jekyll**, evitando que arquivos começando com `_` (como `_nuxt/`) sejam ignorados.

**Você não precisa criar este arquivo manualmente** - o GitHub Actions faz isso automaticamente.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado.

## 🔗 Links Úteis

- [Documentação Nuxt](https://nuxt.com/docs)
- [Nuxt UI](https://ui.nuxt.com/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Desenvolvido com ❤️ usando Nuxt 4**
