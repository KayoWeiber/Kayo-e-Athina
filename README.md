# Kayo & Áthina — Website

Site do casamento de Kayo & Áthina. Aplicação SPA feita com React + Vite, estilizada com Tailwind CSS e preparada para deploy no GitHub Pages.

• Demo: https://kayoweiber.github.io/Kayo-e-Athina/

Status: Em construção 🚧 — funcionalidades, layout e conteúdo ainda podem mudar até a versão 1.0.

## Sumário

- Visão geral
- Funcionalidades
- Stack e dependências
- Estrutura do projeto
- Como rodar localmente
- Scripts disponíveis
- Variáveis de ambiente
- Build e deploy (GitHub Pages)
- Acessibilidade e SEO
- Contribuição
- Licença e créditos

## Visão geral

O site apresenta informações do evento (data, local e contato), páginas temáticas como Nossa História, Galeria e Lista de Presentes, além de recursos visuais como carrossel de fotos e contagem regressiva até o grande dia.

Roteamento é feito via React Router com basename configurado para funcionar em GitHub Pages no caminho `/Kayo-e-Athina`. O bundler é Vite e o projeto usa TypeScript.

## Funcionalidades

- Página inicial com:
	- Contagem regressiva para 14/11/2026 às 16h (horário local)
	- Carrossel de fotos com autoplay (Embla)
	- Verso bíblico com efeito de máquina de escrever
- Seções e páginas:
	- Nossa História (`/nossa-historia`)
	- Galeria (`/galeria`)
	- Lista de Presentes (`/lista-de-presentes`)
	- Página 404 amigável
- Header responsivo com menu móvel e ocultação ao rolar
- Modal de mapa com integração ao Google Maps (Plus Code e coordenadas)
- Estilização com Tailwind CSS 4 e utilitários customizados (paleta K&A)
- Ícones com Lucide
- Manifest básico para instalação (Add to Home Screen) em dispositivos compatíveis

## Stack e dependências

- React 19, React Router 7
- Vite 7
- TypeScript 5.9
- Tailwind CSS 4 (+ tw-animate-css)
- embla-carousel-react (carrossel)
- lucide-react (ícones)
- ESLint (configs para TS, hooks e vite/react-refresh)
- Aliases de import: `@` aponta para `src/` (ver `vite.config.ts`)

## Estrutura do projeto

```
.
├─ public/
│  ├─ site.webmanifest
│  ├─ galeria/
│  └─ nossa-historia/
├─ src/
│  ├─ App.tsx                 # Rotas e layout principal
│  ├─ main.tsx                # Bootstrap React
│  ├─ index.css               # Tailwind + utilitários K&A
│  ├─ components/
│  │  ├─ Header.tsx, Footer.tsx
│  │  ├─ Home.tsx, Historia.tsx, Galeria.tsx, Lista.tsx, NotFound.tsx
│  │  ├─ Reveal.tsx, Typewriter.tsx, ScrollToTop.tsx
│  │  └─ ui/                  # Componentes utilitários (ex.: carousel)
│  └─ lib/
│     ├─ utils.ts             # Helpers (ex.: cn)
│     └─ useInView.ts         # Hook de interseção
├─ index.html                  # Meta tags, fontes e manifest
├─ vite.config.ts              # Base /Kayo-e-Athina e alias @
├─ eslint.config.js            # Regras de lint
├─ package.json                # Scripts e dependências
└─ README.md
```

## Como rodar localmente

Pré-requisitos:

- Node.js 18+ (recomendado 20 LTS)
- npm (ou pnpm/yarn, adapte os comandos)

Passos:

1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm run dev`
3. Acesse no navegador: `http://localhost:5173/Kayo-e-Athina/`

Observação: o projeto usa `basename="/Kayo-e-Athina"` no React Router para refletir o caminho do GitHub Pages. Em desenvolvimento, acesse com esse sufixo no URL para evitar 404.

## Scripts disponíveis

- `npm run dev` — Inicia o Vite em modo de desenvolvimento
- `npm run build` — Type-check (`tsc -b`) e build de produção (`vite build`)
- `npm run preview` — Pré-visualiza o build localmente
- `npm run lint` — Executa o ESLint no projeto
- `npm run deploy` — Publica o conteúdo da pasta `dist` na branch `gh-pages` (via `gh-pages`)

## Variáveis de ambiente

Não há variáveis de ambiente obrigatórias neste projeto. As rotas e caminhos estão configurados via `vite.config.ts` (propriedade `base: "/Kayo-e-Athina/"`) e `BrowserRouter` com `basename`.

## Build e deploy (GitHub Pages)

Este projeto está configurado para ser hospedado como Project Site em `https://<usuario>.github.io/<repo>/`.

O que já está pronto:

- `vite.config.ts` com `base: "/Kayo-e-Athina/"`
- `BrowserRouter` com `basename="/Kayo-e-Athina"`
- Script `npm run deploy` usando `gh-pages`

Como publicar:

1. Gere o build: `npm run build`
2. Envie para a branch `gh-pages`: `npm run deploy`
3. No GitHub, em Settings → Pages, selecione a fonte de publicação como “Deploy from a branch” e a branch `gh-pages` (pasta raiz).
4. Aguarde alguns minutos até o site ficar disponível.

Dicas e resolução de problemas:

- 404 ao atualizar a página: confirme `base` no Vite e `basename` no Router conforme acima.
- Imagens não aparecem: garanta que os caminhos são relativos à raiz pública (`public/`) ou use URLs absolutas começando com `/`.
- CORS/HTTPS: o GitHub Pages serve via HTTPS; evite recursos inseguros (HTTP).

## Acessibilidade e SEO

- A11y:
	- Fechamento de modais e menu com tecla ESC
	- Uso de `aria-label` em ícones/botões
	- Cores com contraste suave e suporte a `prefers-reduced-motion`
- SEO/Meta:
	- `index.html` contém metas de título, descrição, Open Graph e Twitter
	- Manifest (`public/site.webmanifest`) e ícones para instalação em dispositivos

## Contribuição

Contribuições são bem-vindas! Abra uma issue para discussões ou envie um PR.

Sugestão de fluxo:

1. Faça um fork e crie sua branch: `feat/sua-ideia`
2. Rode `npm run dev` e `npm run lint`
3. Garanta que o build (`npm run build`) completa sem erros
4. Envie o PR descrevendo a mudança e, se possível, com screenshots

## Licença e créditos

- Licença: MIT (ver `LICENSE`)
- Ícones: [Lucide](https://lucide.dev)
- Fonts: Poppins e Playfair Display (Google Fonts)
- Carrossel: Embla

—

Feito com 💜 por Kayo & Áthina.