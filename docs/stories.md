# Histórias

Cada história é **um arquivo JSON** em `src/data/stories/`. Qualquer `.json` nessa pasta é carregado
automaticamente — não precisa registrar em lugar nenhum. A home, a lista, o sitemap e os links
"Continue lendo" pegam a história nova sozinhos.

## Como adicionar uma nova história (passo a passo)

> Para IA: siga exatamente isto. Não adicione campos novos ao JSON e não mexa em código para incluir
> uma história.

1. **Descubra o próximo `id`**: o maior `id` existente + 1 (ver tabela no fim ou rodar o script de
   validação abaixo). `id` é string: `"13"`.
2. **Escolha o `slug`**: em inglês, minúsculas e hífens, igual ao título em inglês
   (`"The Old Bookshop"` → `the-old-bookshop`). Precisa ser único.
3. **Crie `src/data/stories/<slug>.json`** copiando o modelo abaixo.
4. **Escreva em todos os idiomas existentes** — hoje `en`, `pt`, `fr`, `es`. Todo `title`, `description` e
   todo segmento de `content` precisa ter os quatro. (Se um idioma novo for adicionado ao site, ver
   [i18n.md](i18n.md), toda história precisa recebê-lo.)
5. **Rode a validação** (script abaixo) — deve mostrar `faltando: nenhum` e nenhum `DUP`.
6. **Confira no navegador**: `npm run dev` → `/stories/<slug>`, troque os idiomas no Header.
7. **Deploy.** As páginas são geradas no build: a história só aparece em produção depois de um novo
   build.

### Modelo

```json
{
  "id": "13",
  "slug": "the-old-bookshop",
  "title": {
    "en": "The Old Bookshop",
    "pt": "A Velha Livraria",
    "fr": "La Vieille Librairie",
    "es": "La Vieja Librería"
  },
  "description": {
    "en": "One sentence that makes people want to read it.",
    "pt": "Uma frase que dá vontade de ler.",
    "fr": "Une phrase qui donne envie de lire.",
    "es": "Una frase que dé ganas de leerla."
  },
  "content": [
    {
      "id": "s1",
      "text": {
        "en": "Two or three sentences.",
        "pt": "Duas ou três frases.",
        "fr": "Deux ou trois phrases.",
        "es": "Dos o tres frases."
      }
    },
    {
      "id": "s2",
      "text": { "en": "...", "pt": "...", "fr": "...", "es": "..." }
    }
  ]
}
```

### Regras de conteúdo

- **Originais.** Nada copiado ou adaptado de livros, filmes ou sites — o AdSense reprova conteúdo de
  terceiros e há risco de direitos autorais (por isso "O Pequeno Príncipe" foi removido).
- **8 a 10 segmentos**, cada um com 2–3 frases. O segmento é a unidade de tradução: o leitor abre a
  tradução de um segmento por vez.
- **Segmentos alinhados**: `s3` em `pt` é a tradução de `s3` em `en`, frase por frase. Traduza o
  sentido de forma natural, não palavra por palavra.
- **Português do Brasil** (`ônibus`, `café da manhã`, `celular`). **Francês da França.**
  **Espanhol neutro latino-americano** (`computadora`, `celular`, `boleto`, `autobús`; sem `vosotros`).
- **Nível**: histórias simples usam presente e vocabulário do dia a dia (mercado, trabalho, rotina);
  histórias mais avançadas usam passado (en: past simple; pt: pretérito; fr: passé composé + imparfait;
  es: pretérito indefinido + imperfecto).
- **Diálogos** com aspas tipográficas: `“...”` em `en`/`pt`/`es`, `« ... »` com espaços em `fr`.
  Em `es`, use `¿...?` e `¡...!`. Em `fr`,
  espaço antes de `: ; ! ?` (`Bonjour !`).
- `\n\n` dentro do texto cria quebra de parágrafo (é respeitado na tela). Use pouco.
- `description` em uma frase; ela aparece na lista e vira a meta description da página (SEO).
- Ideal: um tema de vocabulário claro por história (comida, viagem, trabalho, casa, clima…), e variar
  temas entre histórias.

### Validação

Da raiz do projeto:

```bash
cd src/data/stories && node -e "
const fs=require('fs');const L=['pt','en','fr','es'];const ids=new Set(),slugs=new Set();
for(const f of fs.readdirSync('.')){const s=JSON.parse(fs.readFileSync(f,'utf8'));
if(ids.has(s.id)||slugs.has(s.slug))console.log('DUP',f);ids.add(s.id);slugs.add(s.slug);
const miss=[...L.filter(l=>!s.title[l]||!s.description[l]),...s.content.filter(p=>L.some(l=>!p.text[l])).map(p=>p.id)];
const pids=s.content.map(p=>p.id);if(new Set(pids).size!==pids.length)console.log('DUP segmento',f);
console.log(s.id.padStart(2),s.slug.padEnd(24),'segs',s.content.length,'faltando:',miss.join(',')||'nenhum')}"
```

Se o JSON estiver inválido (vírgula sobrando, aspas `"` sem escapar dentro do texto), o comando quebra
apontando o arquivo. Dentro do texto, use as aspas tipográficas `“ ”` e não `"`.

## Referência do formato

Tipos em `src/lib/stories.ts` (`Story`, `StoryParagraph`, `StorySummary`).

| Campo | Regra |
|---|---|
| `id` | Único, string numérica. Define a ordem: **maior id aparece primeiro** na home e na lista. |
| `slug` | Único; vira a URL `/stories/<slug>`. |
| `title`, `description` | Um valor por idioma. Se faltar, a interface cai para `en`. O SEO usa sempre `en`. |
| `content[]` | Segmentos da história, na ordem de leitura. |
| `content[].id` | Único dentro da história (`s1`, `s2`, …). Controla qual tradução está aberta. |
| `content[].text` | O mesmo trecho em cada idioma. |

O nome do arquivo não importa para o site (ex.: `the-hidden-coffe.json` tem slug `the-hidden-cafe`),
mas mantenha nome = slug.

## Histórias atuais

| id | slug | Segmentos | Tema |
|---|---|---|---|
| 12 | the-lighthouse-keeper | 8 | tempestade, mar (passado) |
| 11 | grandmas-recipe | 8 | cozinha, ingredientes (passado) |
| 10 | the-night-train | 8 | viagem de trem (passado) |
| 9 | the-first-day-at-work | 8 | escritório, apresentações (presente) |
| 8 | the-saturday-market | 8 | feira, números, preços (presente) |
| 7 | the-lost-umbrella | 8 | ônibus, chuva (presente) |
| 6 | the-silver-watch | 10 | mistério |
| 5 | the-starlit-archive | 10 | fantasia |
| 4 | the-forgotten-garden | 4 | — |
| 3 | the-hidden-cafe | 4 | — |
| 2 | daily-routine | 4 | rotina |

Todas com `pt`, `en`, `fr` e `es` completos. As de 4 segmentos são boas candidatas a serem expandidas.
