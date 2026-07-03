-- 1. Create the site_config table
create table if not exists public.site_config (
  id bigint generated always as identity primary key,
  logo_url text,
  hero_media_url text,
  hero_media_type text default 'image',
  hero_opacity integer default 80,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for site_config
alter table public.site_config enable row level security;

-- Create policies for site_config
create policy "Allow public read for site_config" on public.site_config for select using (true);
create policy "Allow public insert for site_config" on public.site_config for insert with check (true);
create policy "Allow public update for site_config" on public.site_config for update using (true);
create policy "Allow public delete for site_config" on public.site_config for delete using (true);

-- Insert initial record if not exists
insert into public.site_config (logo_url, hero_media_url, hero_media_type, hero_opacity)
select '', '', 'image', 80
where not exists (select 1 from public.site_config);


-- 2. Create the section_backgrounds table
create table if not exists public.section_backgrounds (
  id bigint generated always as identity primary key,
  section_name text unique not null,
  media_url text,
  media_type text default 'image',
  opacity integer default 100,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for section_backgrounds
alter table public.section_backgrounds enable row level security;

-- Create policies for section_backgrounds
create policy "Allow public read for section_backgrounds" on public.section_backgrounds for select using (true);
create policy "Allow public insert for section_backgrounds" on public.section_backgrounds for insert with check (true);
create policy "Allow public update for section_backgrounds" on public.section_backgrounds for update using (true);
create policy "Allow public delete for section_backgrounds" on public.section_backgrounds for delete using (true);


-- 3. Create the site_assets bucket in Storage if not exists
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site_assets', 
  'site_assets', 
  true, 
  104857600, -- 100MB limit
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
)
on conflict (id) do nothing;

-- Create policies for storage bucket access
create policy "Allow public read access for site_assets"
on storage.objects for select
using (bucket_id = 'site_assets');

create policy "Allow public insert access for site_assets"
on storage.objects for insert
with check (bucket_id = 'site_assets');

create policy "Allow public update access for site_assets"
on storage.objects for update
using (bucket_id = 'site_assets');

create policy "Allow public delete access for site_assets"
on storage.objects for delete
using (bucket_id = 'site_assets');
