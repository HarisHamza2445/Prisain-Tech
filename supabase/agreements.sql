-- Run once in Supabase → SQL Editor (a new project just for PrisainTech is recommended).

create table if not exists public.agreements (
  ref text primary key,
  signed_at timestamptz not null,
  version text not null,
  signature_type text not null,
  client_name text not null,
  business text,
  phone text,
  package_name text not null,
  price text,
  pdf_path text not null,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Only the website's server (secret key) can read or write.
alter table public.agreements enable row level security;

-- Private bucket for the signed PDFs.
insert into storage.buckets (id, name, public)
values ('agreements', 'agreements', false)
on conflict (id) do nothing;

-- If you created the table before the phone column existed:
alter table public.agreements add column if not exists phone text;
