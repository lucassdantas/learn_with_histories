# Histórias

Cada história é **um arquivo JSON** em `src/data/stories/`. Qualquer `.json` nessa pasta é carregado
automaticamente — não precisa registrar em lugar nenhum. A home, a lista, o sitemap e os links
"Continue lendo" pegam a história nova sozinhos.

## Como adicionar uma nova história (passo a passo)

> Para IA: siga exatamente isto. Não adicione campos novos ao JSON e não mexa em código para incluir
> uma história.

1. **Descubra o próximo `id`**: o maior `id` existente + 1 (ver tabela no fim ou rodar o script de
   validação abaixo). `id` é string: `"29"`.
2. **Escolha o `slug`**: em inglês, minúsculas e hífens, igual ao título em inglês
   (`"The Clockmaker"` → `the-clockmaker`). Precisa ser único.
3. **Crie `src/data/stories/<slug>.json`** copiando o modelo abaixo.
4. **Escreva em todos os idiomas existentes** — hoje `en`, `pt`, `fr`, `es`. Todo `title`, `description`,
   todo segmento de `content` e todo item de `vocabulary` precisa ter os quatro.
   Defina o `level` (`beginner` ou `intermediate`) e 8–10 itens de `vocabulary`.
   (Se um idioma novo for adicionado ao site, ver
   [i18n.md](i18n.md), toda história precisa recebê-lo.)
5. **Rode a validação** (script abaixo) — deve mostrar `faltando: nenhum` e nenhum `DUP`/`ERRO`.
6. **Confira no navegador**: `npm run dev` → `/stories/<slug>`, troque os idiomas no Header.
7. **Deploy.** As páginas são geradas no build: a história só aparece em produção depois de um novo
   build.

### Modelo

```json
{
  "id": "29",
  "slug": "the-clockmaker",
  "level": "intermediate",
  "title": {
    "en": "The Clockmaker",
    "pt": "O Relojoeiro",
    "fr": "L'Horloger",
    "es": "El Relojero"
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
  ],
  "vocabulary": [
    { "en": "clock", "pt": "relógio", "fr": "horloge", "es": "reloj" },
    { "en": "to repair", "pt": "consertar", "fr": "réparer", "es": "reparar" }
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
- **Vocabulário**: 8–10 palavras ou expressões **que aparecem no texto**, na forma de dicionário
  (verbo no infinitivo: `to fold` / `dobrar` / `plier` / `doblar`). Se a palavra for ambígua em inglês,
  esclareça entre parênteses: `floor (of a building)`. O `en` precisa ser único dentro da história (é a
  chave da lista). Aparece no fim da leitura como "palavra no idioma aprendido → tradução no nativo".
- **Nível** (`level`): `beginner` = presente, frases curtas, vocabulário do dia a dia; `intermediate` =
  passado, frases mais longas, mais enredo. Aparece como selo nos cards, na leitura e no filtro da lista.
- Ideal: um tema de vocabulário claro por história (comida, viagem, trabalho, casa, clima…), e variar
  temas entre histórias.

### Validação

Da raiz do projeto:

```bash
cd src/data/stories && node -e "
const fs=require('fs');const L=['pt','en','fr','es'];const ids=new Set(),slugs=new Set();
for(const f of fs.readdirSync('.')){const s=JSON.parse(fs.readFileSync(f,'utf8'));
if(ids.has(s.id)||slugs.has(s.slug))console.log('DUP',f);ids.add(s.id);slugs.add(s.slug);
if(!['beginner','intermediate'].includes(s.level))console.log('ERRO level',f);
if(!Array.isArray(s.vocabulary)||s.vocabulary.length<8)console.log('ERRO vocabulary (mín. 8)',f);
const miss=[...L.filter(l=>!s.title[l]||!s.description[l]),...s.content.filter(p=>L.some(l=>!p.text[l])).map(p=>p.id),
  ...(s.vocabulary||[]).filter(v=>L.some(l=>!v[l])).map((v,i)=>'vocab'+i)];
const pids=s.content.map(p=>p.id);if(new Set(pids).size!==pids.length)console.log('DUP segmento',f);
const vk=(s.vocabulary||[]).map(v=>v.en);if(new Set(vk).size!==vk.length)console.log('DUP vocabulary',f);
console.log(s.id.padStart(2),s.slug.padEnd(30),s.level,'segs',s.content.length,'faltando:',miss.join(',')||'nenhum')}"
```

Se o JSON estiver inválido (vírgula sobrando, aspas `"` sem escapar dentro do texto), o comando quebra
apontando o arquivo. Dentro do texto, use as aspas tipográficas `“ ”` e não `"`.

## Referência do formato

Tipos em `src/lib/stories.ts` (`Story`, `StoryParagraph`, `StorySummary`, `StoryLevel`, `VocabularyItem`).

| Campo | Regra |
|---|---|
| `id` | Único, string numérica. Define a ordem: **maior id aparece primeiro** na home e na lista. |
| `slug` | Único; vira a URL `/stories/<slug>`. |
| `level` | `beginner` ou `intermediate`. Selo + filtro na lista + `educationalLevel` no JSON-LD. |
| `title`, `description` | Um valor por idioma. Se faltar, a interface cai para `en`. O SEO usa sempre `en`. |
| `content[]` | Segmentos da história, na ordem de leitura. |
| `content[].id` | Único dentro da história (`s1`, `s2`, …). Controla qual tradução está aberta. |
| `content[].text` | O mesmo trecho em cada idioma. |
| `vocabulary[]` | 8–10 itens `{ en, pt, fr, es }`. Também vira `keywords` no JSON-LD (usa o `en`). |

O nome do arquivo não importa para o site (ex.: `the-hidden-coffe.json` tem slug `the-hidden-cafe`),
mas mantenha nome = slug.

## Histórias atuais

27 histórias, todas com `pt`, `en`, `fr`, `es`, nível e vocabulário. Maior id aparece primeiro.

| id | slug | Nível | Trechos | Tema |
|---|---|---|---|---|
| 28 | the-first-snow | beginner | 8 | neve, inverno, vizinhos |
| 27 | the-library-card | beginner | 8 | biblioteca, dias da semana, horários |
| 26 | the-night-of-the-blackout | intermediate | 9 | apagão, vizinhos, prédio |
| 25 | the-music-box | intermediate | 9 | antiguidades, conserto, família |
| 24 | the-wrong-train | intermediate | 9 | estação, trem, trabalho |
| 23 | the-mountain-trail | intermediate | 9 | trilha, natureza, orientação |
| 22 | the-violinist-in-the-square | intermediate | 9 | música, praça, coragem |
| 21 | the-paper-boat | intermediate | 9 | rio, cartas, amizade |
| 20 | the-old-bookshop | intermediate | 9 | livros, Lisboa, leitura |
| 19 | the-message-in-a-bottle | intermediate | 9 | mar, cartas, correio |
| 18 | lunch-at-the-restaurant | beginner | 8 | restaurante, pedir comida |
| 17 | the-lost-cat | beginner | 8 | preposições (em cima, embaixo, atrás) |
| 16 | at-the-doctor | beginner | 8 | saúde, corpo, farmácia |
| 15 | the-birthday-surprise | beginner | 8 | família, festa, números |
| 14 | a-day-at-the-beach | beginner | 8 | praia, verão, comida |
| 13 | the-new-neighbor | beginner | 8 | mudança, casa, apresentações |
| 12 | the-lighthouse-keeper | intermediate | 8 | tempestade, mar |
| 11 | grandmas-recipe | intermediate | 8 | cozinha, ingredientes |
| 10 | the-night-train | intermediate | 8 | viagem de trem |
| 9 | the-first-day-at-work | beginner | 8 | escritório, apresentações |
| 8 | the-saturday-market | beginner | 8 | feira, números, preços |
| 7 | the-lost-umbrella | beginner | 8 | ônibus, chuva |
| 6 | the-silver-watch | intermediate | 10 | mistério |
| 5 | the-starlit-archive | intermediate | 10 | ficção científica |
| 4 | the-forgotten-garden | intermediate | 4 | natureza, jardim |
| 3 | the-hidden-cafe | beginner | 8 | cidade, café |
| 2 | daily-routine | beginner | 8 | rotina, dias da semana |

`the-forgotten-garden` é a única com 4 trechos (mas trechos longos) — candidata a ser expandida.
