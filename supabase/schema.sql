-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- CHANNELS Table
create table channels (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  cover_url text,
  "order" int default 0,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- VIDEOS Table
create table videos (
  id uuid primary key default uuid_generate_v4(),
  channel_id uuid references channels(id) on delete cascade not null,
  title text not null,
  storage_path text not null,
  poster_path text,
  duration int,
  status text check (status in ('draft', 'approved', 'rejected')) default 'draft',
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table channels enable row level security;
alter table videos enable row level security;

-- Public Read Policies
create policy "Public channels are viewable by everyone"
  on channels for select
  using ( true );

create policy "Public videos are viewable by everyone"
  on videos for select
  using ( status = 'approved' );

-- Storage Bucket Policies (You must create the 'videos' bucket in dashboard first)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);
