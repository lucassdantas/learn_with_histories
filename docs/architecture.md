# Arquitetura

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4** (tokens em `src/app/globals.css`, sem `tailwind.config`)
- Fontes via `next/font/google` (self-hosted): **Literata** (títulos + texto da história) e
  **Open Sans** (interface)
- Sem banco de dados, sem autenticação, sem variáveis de ambiente

## Design

O layout segue o redesign em `design/` (protótipo `LearnWithHistories.dc.html`, tokens e regras em
`Design System.dc.html`, assets em `design/brand/`). Ao mudar visual, confira lá primeiro.

### Tokens (`src/app/globals.css`)

Variáveis semânticas em `:root` (claro) e `.dark` (escuro), mapeadas em `@theme inline`. Use **só** as
classes semânticas — elas trocam sozinhas no tema escuro, sem prefixo `dark:`:

| Classe | Uso |
|---|---|
| `bg-background`, `bg-surface`, `bg-surface-2` | fundo da página, cards/inputs, painéis/rodapé |
| `text-foreground`, `text-muted` | texto, texto secundário |
| `border-border`, `border-border-strong` | divisórias, bordas de controles |
| `border-accent`, `bg-accent-soft` | ornamentos (logo, "+", marcador dos cards) |
| `text-accent-ink` | texto em destaque (o `accent` puro tem contraste baixo para texto no claro) |
| `text-translation`, `bg-translation-soft` | bloco de tradução |
| `bg-primary`, `hover:bg-primary-hover`, `text-on-primary` | botão principal |
| `text-link` | links |
| `bg-ad`, `text-ad-ink` | espaços de anúncio |
| `font-story` / `font-sans` | Literata / Open Sans |
| `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-story`, `text-tr`, `text-eyebrow`, `text-ad-label` | tamanhos fluidos |
| `rounded-control`, `rounded-translation`, `rounded-card`, `rounded-panel`, `rounded-ad` | raios |
| `shadow-card`, `shadow-raised` | sombras |
| `size-touch` / `min-h-touch` | alvo de toque de 44px |
| `max-w-reading` (700px) | coluna de leitura |

Utilitários próprios: `page` (container de 1200px com padding lateral fluido), `select-arrow`
(`<select>` nativo com seta em CSS) e `eyebrow` (rótulo pequeno em caixa alta).

Breakpoint extra **`nav:` = 1000px**: o Header troca o hambúrguer pela navegação completa (os rótulos
em francês não cabem antes disso). A sidebar da leitura também aparece a partir dele.

> Os nomes `text-tr` e `rounded-translation` diferem do Design System (`text-translation`,
> `radius-tr`) de propósito: os originais colidiam com a cor `text-translation` e com o utilitário
> nativo `rounded-tr` do Tailwind.

## Estrutura de pastas

```
src/
  app/
    layout.tsx              # fontes, script do tema, metadata da home, AdScript, providers, Header, <main>, Footer
    page.tsx                # Home (server): 6 histórias mais novas + trecho de exemplo → HomePage
    HomePage.tsx            # client: hero + exemplo interativo, anúncio, "Como funciona", recentes, "Pronto para começar?"
    not-found.tsx           # 404 (também usado por notFound() de slug inexistente)
    stories/
      page.tsx              # server: lê as histórias, metadata → StoriesList
      StoriesList.tsx       # client: busca (ignora acentos), anúncio, grade, estado vazio
      [slug]/page.tsx       # server: generateStaticParams, generateMetadata, JSON-LD, notFound()
      [slug]/StoryReader.tsx# client: barra "Voltar/Lendo em", segmentos, "Terminar", sidebar, "Continue lendo"
    about/ terms/ privacy/  # page.tsx + layout.tsx (só exporta metadata)
    api/stories/…           # GET das histórias em JSON. Não usado pelo site hoje.
    lib/seo.ts              # generateSEO(), SITE_URL, SITE_NAME
    sitemap.ts robots.ts manifest.ts
    icon.svg apple-icon.png favicon.ico   # ícones (de design/brand); o Next gera as tags
    globals.css             # tokens do design
  components/
    Header.tsx Footer.tsx   # montados uma vez no layout
    Logo.tsx                # símbolo (SVG inline) + wordmark "Learn*With*Histories"
    LanguageSelect.tsx      # <select> de idioma (compact no header, full no menu/home)
    Segment.tsx             # um trecho: texto + botão "+" + tradução (leitura e exemplo da home)
    StoryCard.tsx           # card de história (link inteiro)
    LegalPage.tsx           # layout de Termos/Privacidade (seções numeradas + contato)
    AdScript.tsx AdBanner.tsx AdSidebar.tsx   # Google AdSense (ver adsense.md)
    ConsentSettingsButton.tsx                 # reabre o aviso de cookies do Google
    StructuredData.tsx JsonLd.tsx             # JSON-LD
  config/ads.ts translations.ts
  context/LanguageContext.tsx ThemeContext.tsx
  data/stories/*.json       # AS HISTÓRIAS (ver stories.md)
  lib/stories.ts ads.ts theme-script.ts
  translations/<pagina>/<idioma>.json
public/
  ads.txt icons/ og-images/
design/                     # handoff do design (não faz parte do build; ignorado no lint)
tests/                      # Playwright
```

## Fluxo de dados das histórias

```
src/data/stories/*.json
      │  fs.readFileSync (src/lib/stories.ts) — no servidor, no build
      ▼
page.tsx (server components) ──props──▶ HomePage / StoriesList / StoryReader (client)
```

As páginas das histórias são **geradas estaticamente no build** (`generateStaticParams`). Slug que
não existe → 404 (`dynamicParams = false`). **Adicionou/editou um JSON? Precisa de um novo build/deploy.**

Listas recebem `StorySummary` (sem o texto) para não inflar o HTML.

## Idiomas (dois conceitos diferentes)

`LanguageContext` guarda dois valores no `localStorage` (via `useSyncExternalStore`):

| Estado | Padrão | Para que serve |
|---|---|---|
| `nativeLanguage` | `pt` | Idioma da **interface** e da **tradução** que aparece ao clicar no `+` |
| `learningLanguage` | `en` | Idioma em que o **texto da história** é mostrado |

- O servidor sempre renderiza com o padrão (`pt`/`en`); o navegador aplica a escolha salva logo depois.
- **Os dois nunca ficam iguais**: escolher no "Falo" o idioma que está no "Aprendo" troca os dois.
- Trocar idioma fecha as traduções abertas na leitura.
- `<html lang>` acompanha o `nativeLanguage`; o `<article>` da história tem `lang` do idioma aprendido
  e o bloco de tradução `lang` do nativo.

## Tema claro/escuro

A classe `dark` no `<html>` é a fonte da verdade. `src/lib/theme-script.ts` é um script inline no
`<head>` que aplica o tema salvo (ou o do sistema) **antes da primeira pintura** — sem flash branco no
tema escuro. `ThemeContext` só lê/alterna a classe e salva em `localStorage('theme')`.

## Desempenho

- Tudo estático (SSG) no build; nenhuma página depende de dados em tempo de requisição.
- Fontes self-hosted; só Literata normal e Open Sans são pré-carregadas (o itálico, usado só no
  "With" do logo, carrega sem preload).
- Logo é SVG inline (zero requisições de imagem no layout).
- Anúncios com altura reservada e formato `horizontal` → CLS ≈ 0 (medido: ≤ 0,012).
- Não há `Cache-Control` customizado: o Next define o cache certo (assets com hash são imutáveis).

## SEO

- `generateSEO({ title, description, path, image, type })` em `src/app/lib/seo.ts`: título, descrição,
  canonical, Open Graph (imagem `public/og-images/learn-with-histories-og.png`), Twitter e a meta
  `google-adsense-account`.
- Cada rota tem seu próprio `metadata`:
  - `/` → `app/layout.tsx`
  - `/stories` → `app/stories/page.tsx`
  - `/stories/[slug]` → `generateMetadata` (`og:type=article`) + JSON-LD `Article` e `BreadcrumbList`
  - `/about`, `/terms`, `/privacy` → `layout.tsx` da pasta
- Links internos: a home lista as 6 histórias mais novas e cada história termina com 3 links.
- **Página nova?** Exporte `metadata = generateSEO({ ..., path: '/rota' })` (senão herda o canonical da
  home) e adicione em `app/sitemap.ts`.
- `next.config.ts`: headers de segurança e redirects `/privacy-policy → /privacy`,
  `/terms-of-service → /terms`.

## Testes

`tests/theme-toggle.spec.ts` (Playwright): tema alterna e persiste sem flash, tradução abre/fecha,
idiomas trocam entre si. Com o site rodando:

```bash
npm run dev                      # ou: npm run build && npx next start -p 3123
npx playwright test              # BASE_URL=http://localhost:3123 npx playwright test
```

## Detalhes que confundem

- `getTranslation()` devolve a própria **chave** quando não acha a tradução.
- Exports de um arquivo `'use client'` não podem ser lidos como valor por um server component (viram
  referência de cliente) — por isso o script do tema mora em `src/lib/theme-script.ts`.
