<div align="center">

<img src="public/og-images/learn-with-histories-og.png" alt="LearnWithHistories — aprenda idiomas lendo histórias curtas" width="720" />

# LearnWithHistories

**Aprenda idiomas lendo histórias curtas, com tradução parágrafo a parágrafo.**

[**🌐 Ver o site no ar**](https://learn-with-histories.devdantas.com.br) · [Documentação](docs/README.md)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 💡 A ideia

Você escolhe **o idioma que fala** e **o idioma que quer aprender**. A história aparece no idioma que
você está aprendendo e, se travar em algum trecho, um clique no **+** abre a tradução daquele parágrafo
no seu idioma. No fim, uma lista de vocabulário com as palavras-chave.

Sem cadastro, sem paywall: abriu, leu, aprendeu.

## ✨ Destaques

| | |
|---|---|
| 🌍 **4 idiomas** | Português, inglês, francês e espanhol — tanto nas histórias quanto na interface (12 combinações possíveis) |
| 📚 **27 histórias** | Níveis iniciante e intermediário, cada uma com vocabulário |
| ⚡ **100% estático** | Todas as páginas são geradas no build (SSG). LCP < 0,55s no mobile com CPU 4× mais lenta |
| 🎬 **Animações nativas** | Transição entre páginas com React `<ViewTransition>`, barra de progresso de leitura com CSS scroll timelines |
| 🌗 **Tema claro/escuro** | Sem flash branco no carregamento, respeitando a preferência do sistema |
| ♿ **Acessível** | Alvos de toque de 44px, `lang` correto em cada bloco de texto, `prefers-reduced-motion` respeitado |
| 🔎 **SEO completo** | Metadata por rota, Open Graph, JSON-LD (`Article`, `BreadcrumbList`), sitemap e robots gerados |
| 💰 **Monetizado** | Google AdSense com espaço reservado para os anúncios (CLS ≈ 0) |

## 🛠️ Decisões técnicas

Algumas escolhas que valem a pena comentar:

- **Sem banco de dados.** Cada história é um arquivo JSON em `src/data/stories/`, lido no servidor
  durante o build. Adicionar uma história nova é só criar um arquivo — a home, a lista, o sitemap e os
  links "Continue lendo" se atualizam sozinhos.
- **Server components para dados, client components para interação.** O `page.tsx` lê os dados e
  exporta o `metadata`; a parte interativa fica num componente `'use client'` separado. As listas
  recebem só o resumo das histórias (sem o texto) para não inflar o HTML.
- **Idioma como estado do cliente, não como rota.** As preferências ficam num React Context
  sincronizado com o `localStorage` via `useSyncExternalStore`. Os dois idiomas nunca ficam iguais:
  escolher no "Falo" o idioma do "Aprendo" troca os dois.
- **Tema sem flash.** Um script inline no `<head>` aplica o tema salvo *antes da primeira pintura*.
- **CSS primeiro nas animações.** Quase tudo é CSS (keyframes, scroll timelines); JS só onde é
  inevitável (`IntersectionObserver` para revelar elementos ao rolar). Medido: CLS ≤ 0,01.
- **Design system em tokens.** O layout segue um design próprio (em [`design/`](design/)), traduzido para
  tokens semânticos no Tailwind v4 (`bg-surface`, `text-muted`, `font-story`…) que trocam sozinhos no
  tema escuro — nenhum `dark:` espalhado pelo código.

## 🚀 Rodando localmente

Requer **Node 24** (ver `.nvmrc`).

```bash
git clone https://github.com/lucassdantas/learn_with_histories.git
cd learn_with_histories
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run build         # build de produção
npm run start         # serve o build
npm run lint
npx playwright test   # testes E2E (com o dev server rodando)
```

## 📁 Estrutura

```
src/
├── app/              # rotas (App Router): home, /stories, /stories/[slug], /about, /terms, /privacy
├── components/       # Header, Footer, StoryCard, Segment (trecho + tradução), anúncios…
├── context/          # LanguageContext e ThemeContext
├── data/stories/     # as histórias, uma por arquivo JSON
├── translations/     # textos da interface por página e idioma
└── lib/              # leitura das histórias, script do tema, helpers
design/               # protótipo e design system
docs/                 # documentação técnica
tests/                # testes Playwright
```

## 📖 Documentação

| Arquivo | Assunto |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Stack, fluxo de dados, idiomas, tema, animações, desempenho, SEO |
| [docs/stories.md](docs/stories.md) | Formato das histórias e passo a passo para adicionar uma |
| [docs/i18n.md](docs/i18n.md) | Traduções da interface e como adicionar um idioma |
| [docs/adsense.md](docs/adsense.md) | Integração com o Google AdSense |

---

<div align="center">

Feito por **Lucas Dantas** · [GitHub](https://github.com/lucassdantas)

</div>
