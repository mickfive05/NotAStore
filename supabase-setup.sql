-- Esegui questo file una sola volta nel SQL Editor del progetto Supabase.
-- Lo stato non è accessibile dal browser: soltanto il backend usa la service role key.

create table if not exists public.notastore_state (
  id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.notastore_state enable row level security;
revoke all on table public.notastore_state from anon, authenticated;

comment on table public.notastore_state is
  'Stato persistente del simulatore NotAStore, accessibile esclusivamente al backend.';
