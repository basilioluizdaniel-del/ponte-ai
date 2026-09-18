# PONTE.AI v0.1
MVP responsivo em Next.js preparado para Vercel + Supabase.

## Rodar localmente
npm install
cp .env.example .env.local
npm run dev

## Supabase
Crie um projeto, execute `supabase/schema.sql` no SQL Editor e preencha `.env.local`.

## Vercel
Importe este repositório/projeto, configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY e faça Deploy.
