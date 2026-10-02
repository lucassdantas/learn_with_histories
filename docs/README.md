# LearnWithHistories — Documentação

Site para aprender idiomas lendo histórias. Cada história é escrita em vários idiomas
(hoje: `pt`, `en`, `fr`, `es`). O usuário escolhe **o idioma que fala** (nativo) e **o idioma que quer
aprender**; a história é exibida no idioma que ele está aprendendo e, parágrafo a parágrafo, ele pode
abrir a tradução no idioma nativo.

Produção: https://learn-with-histories.devdantas.com.br

## Índice

| Arquivo | Assunto |
|---|---|
| [architecture.md](architecture.md) | Stack, estrutura de pastas, fluxo de dados, idiomas, tema, SEO |
| [stories.md](stories.md) | Formato do JSON das histórias e como adicionar uma nova |
| [i18n.md](i18n.md) | Traduções da interface (UI) e como adicionar um idioma novo |
| [adsense.md](adsense.md) | Como o Google AdSense está integrado e o que ainda falta |

> `IMPLEMENTATION_SUMMARY.md` e `SEO.md` na raiz são documentos antigos, da época em que o site
> se chamava "LinguaStories" (`linguastories.com`). Muito do que dizem está desatualizado — confie
> nestes docs e no código.

## Rodando

Requer **Node 24** (`engines` no `package.json` e `.nvmrc`; a Vercel usa o `engines` para escolher a versão).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

Existe um teste Playwright em `tests/theme-toggle.spec.ts` (espera o dev server rodando em
`localhost:3000`; não há script `test` no `package.json`, rode com `npx playwright test`).

## Tarefas comuns

- **Adicionar uma história** → [stories.md — passo a passo](stories.md#como-adicionar-uma-nova-história-passo-a-passo)
  (só criar um JSON; não precisa mexer em código)
- **Colocar/ajustar anúncios** → [adsense.md — passo a passo](adsense.md#passo-a-passo-para-colocar-os-anúncios-no-ar)
- **Adicionar um idioma** → [i18n.md](i18n.md)

## Resumo rápido para outra IA

- Next.js 16 (App Router) + React 19 + Tailwind v4. **Leia `node_modules/next/dist/docs/`** antes de
  mexer em APIs do Next — a versão tem breaking changes (ver `AGENTS.md`).
- Não há banco de dados. Histórias = arquivos JSON em `src/data/stories/`, lidos no servidor no build.
- Não há rotas por idioma (`/pt/...`). O idioma é estado do cliente (React Context + `localStorage`).
- Padrão das páginas: `page.tsx` é server component (lê dados, exporta `metadata`) e renderiza um
  componente `'use client'` com a interação. Exceções: `/about` e `not-found` são client components
  inteiros; o `metadata` de About/Terms/Privacy fica num `layout.tsx` ao lado.
- SEO: `generateSEO()` em `src/app/lib/seo.ts`; `sitemap.xml` e `robots.txt` são gerados por
  `src/app/sitemap.ts` e `src/app/robots.ts`.
- Visual: segue o design em `design/` (tokens em `src/app/globals.css`). Use as classes semânticas
  (`bg-surface`, `text-muted`, `font-story`…) — ver [architecture.md](architecture.md#design).
- Header e Footer ficam no `layout.tsx`; as páginas não os renderizam.
