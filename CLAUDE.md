# Dashboard Castel Black — Juan Campos

## O que é este projeto
Dashboard de métricas de tráfego pago para a **Barbearia Castel Black**, cliente da agência do Juan.
React + Vite + Shadcn/UI. Dados em tempo real via Meta Ads API.

## Stack
- React 18 + TypeScript + Vite
- Shadcn/UI + Tailwind CSS
- Supabase Edge Function: `meta-ads-data` (busca dados da Meta Graph API)
- Supabase URL: https://vnamxmndwxwqybhswzox.supabase.co

## Estrutura
- `src/pages/Index.tsx` — página principal com todos os KPIs e gráficos
- `src/hooks/useMetaAds.ts` — hook que chama a Edge Function
- `src/components/dashboard/` — componentes (KPICard, SpendChart, LeadsChart, CPAChart, CampaignTable, CampaignDonut)
- `src/lib/mock-data.ts` — dados mock (fallback quando API não retorna)
- `supabase/functions/meta-ads-data/index.ts` — Edge Function Deno que chama a Meta Graph API

## Credenciais Meta Ads (Castel Black)
- Account ID: `act_994354533471788`
- Token: hardcoded na Edge Function (meta-ads-data/index.ts)

## Supabase
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (ver integrations/supabase/client.ts)

## Como rodar local
```bash
npm install
npm run dev
```

## Deploy
- Vercel (projeto conectado ao GitHub)
- Edge Function deployada no Supabase

## Contexto do usuário
- Juan Campos — gestor de marketing digital, agência solo
- Castel Black é cliente de tráfego pago
- Tom: direto, executa primeiro, sem enrolação
