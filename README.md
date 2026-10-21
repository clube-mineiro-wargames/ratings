# CMW Rating Ranking

Web app do **Clube Mineiro de Wargames** com rankings ELO por sistema (MESBG, Kill Team, OPR) e histórico de partidas.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Cadastrar partidas

Edite [`src/data/matches.json`](src/data/matches.json). Cada partida deve ter:

| Campo | Descrição |
| --- | --- |
| `date` | Data e horário no formato `YYYY-MM-DDTHH:mm` (ex.: `2026-04-25T14:00`) |
| `game` | `MESBG`, `Kill Team` ou `OPR` |
| `players` | Dois jogadores com `name` e `result` (`1` vitória, `0` derrota, `0.5` empate) |

As partidas são processadas **em ordem cronológica** para calcular o ELO (rating inicial **1500**, fator **K = 32**).

## Publicar no GitHub Pages

1. Crie o repositório no GitHub (nome sugerido: `cmw-ratings`).
2. Se o nome do repositório for outro, ajuste `base` em [`vite.config.ts`](vite.config.ts) para `/<nome-do-repo>/`.
3. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
4. Envie o código para a branch `main`. O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) fará o deploy.

Site publicado em: `https://<usuario>.github.io/cmw-ratings/`

## Stack

- React + TypeScript (Vite)
- React Router
- Dados estáticos em JSON (sem backend)
