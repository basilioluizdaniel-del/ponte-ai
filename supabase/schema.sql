create table if not exists empresas (id bigint primary key generated always as identity,nome text not null,categoria text not null,bairro text,whatsapp text not null,descricao text,plano text not null default 'gratis',ativo boolean not null default true,created_at timestamptz not null default now());
create table if not exists orcamentos (id bigint primary key generated always as identity,nome text not null,whatsapp text not null,bairro text,descricao text not null,status text not null default 'aberto',created_at timestamptz not null default now());
alter table empresas enable row level security; alter table orcamentos enable row level security;
create policy "empresas publicas" on empresas for select to anon using (ativo=true);
create policy "empresa pode cadastrar" on empresas for insert to anon with check (true);
create policy "criar orcamento" on orcamentos for insert to anon with check (true);
