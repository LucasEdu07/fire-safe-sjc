# Star Fire Landing Page

Landing page premium de conversao para servicos de seguranca contra incendio da Star Fire, com foco em Sao Jose dos Campos e Vale do Paraiba.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod
- Vercel Serverless Function (`/api/leads`)
- Integracao de analytics com GA4 e Meta Pixel

## Rodando localmente

```bash
npm install
npm run dev
```

## Variaveis de ambiente

Crie um arquivo `.env` usando `.env.example` como base.

Variaveis principais:

- `VITE_SITE_URL`
- `VITE_WHATSAPP_NUMBER`
- `VITE_PHONE_DISPLAY`
- `VITE_CONTACT_EMAIL`
- `VITE_COMPANY_CNPJ`
- `VITE_GA4_MEASUREMENT_ID`
- `VITE_META_PIXEL_ID`
- `RESEND_API_KEY`
- `LEAD_EMAIL_TO`
- `LEAD_EMAIL_FROM`
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID` (opcional, recomendado para maior estabilidade)
- `GOOGLE_PLACE_QUERY` (usado se `GOOGLE_PLACE_ID` nao for informado)

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Deploy

Deploy recomendado na Vercel.

- Frontend servido como SPA.
- Endpoint serverless em `api/leads.ts` para envio de leads por e-mail via Resend.
- Endpoint serverless em `api/google-reviews.ts` para buscar reviews oficiais via Google Places API.
