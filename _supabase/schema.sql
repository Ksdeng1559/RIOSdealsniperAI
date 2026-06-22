-- RIOS DealSniperAI Supabase Schema
-- Phase 1 MVP

create extension if not exists pgcrypto;

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  name text not null,
  category text,
  address text,
  city text,
  province text,
  country text default 'Canada',
  phone text,
  email text,
  website text,
  google_rating numeric,
  review_count int,
  source text default 'leadsniperAI',
  raw_payload jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists owner_profiles (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  owner_name text,
  owner_role text,
  estimated_age_range text,
  owner_dependency_score int,
  linkedin_url text,
  public_mentions jsonb default '[]'::jsonb,
  confidence numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists deal_signals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  signal_type text not null,
  signal_name text not null,
  signal_value text,
  severity text,
  confidence numeric default 0,
  source text,
  evidence text,
  created_at timestamptz default now()
);

create table if not exists acquisition_scores (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  api_score int,
  dqs_score int,
  vcs_score int,
  ari_score int,
  classification text,
  primary_signal text,
  confidence numeric default 0,
  recommended_action text,
  score_payload jsonb,
  created_at timestamptz default now()
);

create table if not exists acquisition_briefs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  thesis text,
  value_creation_plan text,
  outreach_angle text,
  risks text,
  recommended_action text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists outreach_log (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  channel text,
  subject text,
  message text,
  status text default 'drafted',
  sent_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_businesses_external_id on businesses(external_id);
create index if not exists idx_businesses_category_city on businesses(category, city);
create index if not exists idx_deal_signals_business_id on deal_signals(business_id);
create index if not exists idx_acquisition_scores_business_id on acquisition_scores(business_id);
create index if not exists idx_acquisition_scores_classification on acquisition_scores(classification);

alter table businesses enable row level security;
alter table owner_profiles enable row level security;
alter table deal_signals enable row level security;
alter table acquisition_scores enable row level security;
alter table acquisition_briefs enable row level security;
alter table outreach_log enable row level security;

-- Claude Code: add project-specific RLS policies based on authenticated app roles.
