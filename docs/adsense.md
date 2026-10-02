# Google AdSense

## Como está integrado

| Peça | Arquivo | O que faz |
|---|---|---|
| Config | `src/config/ads.ts` | `publisherId` (`ca-pub-4081616122157678`), slots `banner` e `sidebar`, flag `isTest` |
| Script | `src/components/AdScript.tsx` | Carrega `adsbygoogle.js` com `next/script` (`afterInteractive`) no `layout.tsx` — vale para o site todo |
| Verificação | `src/app/lib/seo.ts` | Meta tag `google-adsense-account` em todas as páginas |
| Banner | `src/components/AdBanner.tsx` | Faixa com rótulo; formato `horizontal`, `full-width-responsive=false`, altura reservada 100px (mobile) / 120px (≥1000px) |
| Sidebar | `src/components/AdSidebar.tsx` | 300×600 na lateral da leitura; só é renderizado em telas ≥ 1000px |
| Push | `src/lib/ads.ts` | `pushAd()` — pede ao AdSense para preencher o próximo `<ins>`; uma vez por slot |
| Consentimento | `src/components/ConsentSettingsButton.tsx` | Botão "Configurações de privacidade e cookies" (Footer e `/privacy#consent`) que reabre o aviso do Google |
| ads.txt | `public/ads.txt` | `google.com, pub-4081616122157678, DIRECT, f08c47fec0942fa0` |

Onde aparecem (definido pelo design): Home (faixa logo após o hero), `/stories` (entre o cabeçalho e
a grade), leitura (sidebar 300×600 no desktop + faixa depois de "Continue lendo"). **Nenhum anúncio**
entre segmentos da história, nem em Sobre, Termos, Privacidade ou 404.

O rótulo acima dos anúncios vem da tradução `common.ad` (Publicidade / Advertisement / Publicité).

Para testar com IDs de teste do Google, há um bloco comentado em `ads.ts`
(`ca-pub-3940256099942544`). Em `localhost` anúncios reais normalmente não aparecem — é esperado.

### Aviso de cookies (GDPR)

O aviso em si **não é código nosso**: é a CMP (plataforma de consentimento) certificada do Google. Ela
é carregada automaticamente pelo `adsbygoogle.js` depois que a mensagem é publicada no painel (passo 5
abaixo) e aparece só para visitantes da Europa/Reino Unido/Suíça. Um banner de cookies feito à mão
**não** atende a exigência do Google.

No código fica só:
- `ConsentSettingsButton`: chama `googlefc.showRevocationMessage()` para o visitante mudar a escolha.
  Se a CMP não carregou (visitante fora da Europa), leva para `/privacy#consent`.
- Seção 7 da política de privacidade (`privacy.section7*`) explicando o consentimento.

### Regras que o código deve respeitar

- **Nunca anúncio em pop-up/modal** (já existiu um `AdPopup`, removido por violar a política). Para tela
  cheia, use a vinheta do Auto ads.
- Anúncios sempre com rótulo, numa faixa própria, com visual diferente de card (sem borda/sombra,
  raio 4px, fundo `bg-ad`) e longe de botões (≥ 24px; ≥ 40px do "Terminar" e dos "+").
- Sempre reservar a altura antes de carregar (evita salto de layout/CLS). Por isso o banner usa
  formato `horizontal` e não expande na largura total: com `auto`/full-width o Google colocava
  anúncios de ~280px no celular e o conteúdo pulava (CLS 0,15 → 0 depois da troca).
- Não esconder `<ins>` com `display:none` e dar `push` — renderize só quando for visível (ver `AdSidebar`).
- Nada de sticky, pop-up, modal ou anchor manual (anchor/vinheta só pelo Auto ads do painel).

## Passo a passo para colocar os anúncios no ar

1. **Deploy** do código atual.
2. **Adicionar o site** — AdSense → **Sites** → **Adicionar site** → `devdantas.com.br` (o domínio raiz;
   o subdomínio `learn-with-histories.` é coberto por ele).
3. **Verificar o site** — escolha o método **ads.txt** ou **meta tag**; os dois já estão no ar
   (`devdantas.com.br/ads.txt` e a meta `google-adsense-account`). Marque "Coloquei o código" e
   **Verificar**.
4. **Solicitar revisão** — clique em **Solicitar revisão**. Leva de alguns dias a algumas semanas.
   Enquanto isso os espaços de anúncio ficam vazios — é normal. Se for reprovado, o motivo aparece em
   Sites; o mais comum é "conteúdo de baixo valor" → adicionar mais histórias e pedir de novo.
5. **Aviso GDPR** — **Privacidade e mensagens** → **Regulamentações europeias** → **Criar mensagem**:
   - Site: `devdantas.com.br`
   - Idiomas: adicionar Português, English e Français (o padrão do usuário é detectado pelo navegador)
   - URL da política de privacidade: `https://learn-with-histories.devdantas.com.br/privacy`
   - Opções de consentimento: manter "Consentir" e "Gerenciar opções" (pode ativar "Não consentir")
   - **Publicar**. Não precisa mexer no código.
6. **(Opcional) Estados dos EUA** — em Privacidade e mensagens também há a mensagem de "Regulamentações
   estaduais dos EUA". Recomendável se houver tráfego dos EUA.
7. **Blocos de anúncio** — **Anúncios** → **Por bloco de anúncios**. Confira que existem
   `4915717699` (banner) e `8503608919` (sidebar) nesta conta. O antigo `7751588429` (popup) pode ser
   arquivado. Se criar um bloco novo: **Anúncio de display** → responsivo → copie o `data-ad-slot`
   para `src/config/ads.ts`.
8. **(Opcional) Auto ads** — **Anúncios** → **Por site** → editar → ligar **Anúncios fixos (âncora)** e
   **Vinheta**. Deixe "Anúncios na página" desligado no começo para não lotar a página junto com os
   blocos manuais.
9. **ads.txt** — em **Sites**, o status deve virar "Autorizado" (pode levar alguns dias).
10. **Pagamento** — **Pagamentos**: endereço e dados fiscais. Ao atingir US$ 10 o Google manda um PIN
    por carta para confirmar o endereço; ao atingir o limite de pagamento (US$ 100), paga no mês
    seguinte.
11. **Acompanhar** — **Central de políticas** (avisos de violação) e **Relatórios**.

**Nunca:** clicar nos próprios anúncios, pedir para pessoas clicarem, ou recarregar a página para
gerar impressões — isso leva ao banimento da conta. Para ver os anúncios sem risco, use o modo de teste
(`ca-pub-3940256099942544` em `ads.ts`, só local).

## Estado (2026-10-01)

Pronto no código: layout novo do design com posições de anúncio definidas, histórias renderizadas no servidor, título/canonical por página, JSON-LD, sitemap e
robots com domínio certo, meta tag de verificação, sem popup, botão de consentimento, 11 histórias
originais (O Pequeno Príncipe removido).

Falta (painel do Google): passos 2–10 acima, e cadastrar o site + sitemap
(`/sitemap.xml`) no **Google Search Console**.
