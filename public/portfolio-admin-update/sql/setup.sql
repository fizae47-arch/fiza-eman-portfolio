-- =====================================================================
-- Fiza Eman portfolio — Supabase setup
-- Run this whole file once in: Supabase Dashboard > SQL Editor > New query
-- It is safe to run again (it will not duplicate your data).
-- =====================================================================

-- 1) WHO IS THE ADMIN?
-- Change the email below to the SAME email you use to log in at /admin.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower('fizae380@gmail.com');
$$;

-- 2) TABLES
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text,
  live text,
  github text,
  description text,
  highlights text[] not null default '{}',
  tech text[] not null default '{}',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.education_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'education' check (kind in ('education', 'certification')),
  title text not null,
  subtitle text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  content text not null default '',
  category text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  created_at timestamptz not null default now()
);

-- 3) SECURITY: everyone can READ, only the admin can add / edit / delete
grant usage on schema public to anon, authenticated;
grant select on public.projects, public.skills, public.education_items,
                public.articles, public.site_settings to anon, authenticated;
grant insert, update, delete on public.projects, public.skills, public.education_items,
                public.articles, public.site_settings to authenticated;

do $$
declare t text;
begin
  foreach t in array array['projects', 'skills', 'education_items', 'site_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format(
      'create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t
    );
  end loop;
end $$;

alter table public.articles enable row level security;
drop policy if exists "public read published" on public.articles;
create policy "public read published" on public.articles for select using (published = true);
drop policy if exists "admin all articles" on public.articles;
create policy "admin all articles" on public.articles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 4) IMAGE STORAGE (project screenshots uploaded from /admin)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "admin update images" on storage.objects;
create policy "admin update images" on storage.objects for update to authenticated
  using (bucket_id = 'images' and public.is_admin());

drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects for delete to authenticated
  using (bucket_id = 'images' and public.is_admin());

-- 5) STARTING CONTENT (your current portfolio, only inserted if the table is empty)
do $seed$
begin
  if not exists (select 1 from public.projects) then
    insert into public.projects (name, tag, live, github, description, highlights, tech, image_url, sort_order) values
    ('MERN Multi-Vendor E-commerce Platform', 'E-commerce',
     'https://e-commerce-shop-232n.vercel.app/', 'https://github.com/fizae47-arch/e-commerce-shop',
     'A full-stack marketplace with separate customer and shop-side experiences — product search, categories, cart, wishlist, checkout, orders, reviews, refunds, and address management.',
     array['Shop-side product, inventory, order, refund, and event management','Real-time customer messaging with Socket.IO','JWT and role-based authorization across customer and shop roles','PayPal payments and Cloudinary image storage'],
     array['React','Node.js','Express','MongoDB','Redux Toolkit','Socket.IO','PayPal'],
     '/projects/ecommerce.png', 1),
    ('Lahori Lason — Restaurant POS System', 'In production use',
     'https://lahori-lason-fast-food-397m.vercel.app/', 'https://github.com/fizae47-arch/lahori-lason-fast-food',
     'A restaurant point-of-sale system built and deployed for real daily order and sales operations — not a demo. Staff use it to take orders and track earnings.',
     array['Staff authentication and menu/category/deal management','Cart and order processing with printable receipts','Invoice tracking, search, and an earnings dashboard','REST APIs with Node.js, Express, and MongoDB'],
     array['React','Node.js','Express','MongoDB'],
     '/projects/lahori-lason.png', 2),
    ('FizaEstate — Real Estate Platform', 'Real estate',
     'https://mern-estate-theta-woad.vercel.app/', 'https://github.com/fizae47-arch/mern-estate',
     'A property marketplace with listing management, search and filtering, favorites, and direct messaging between users, backed by Google OAuth and Supabase storage.',
     array['Google OAuth alongside standard JWT-protected auth','Full CRUD for property listings with Redux Toolkit state','Search, filtering, favorites, and user profiles','Image storage on Supabase'],
     array['React','Node.js','Express','MongoDB','Tailwind CSS','Supabase'],
     '/projects/fizaestate.png', 3),
    ('BizBoard — Business Dashboard', 'Next.js · Learning project',
     'https://bizboard-gilt.vercel.app/', 'https://github.com/fizae47-arch/bizboard',
     'A Next.js + TypeScript business dashboard covering metrics, products, orders, customers, and analytics — built to go deep on the App Router.',
     array['Next.js App Router with file-based routing','Server and Client Components with loading and error states','Dynamic product pages and a mock API Route Handler','Search and filtering across dashboard views'],
     array['Next.js','TypeScript','Tailwind CSS'],
     '/projects/bizboard.png', 4),
    ('Trippy — Tour & Travel Website', 'First project · Frontend',
     'https://frabjous-lamington-59bff7.netlify.app/', null,
     'My very first project and the starting point of this whole journey — a travel booking site for browsing destinations across different countries, with a dedicated section for recent tours.',
     array['Browsable tours across multiple countries and destinations','A recent tours section highlighting the latest packages','Built with core HTML, CSS, and JavaScript, then extended with React','Deployed on Netlify'],
     array['HTML','CSS','JavaScript','React'],
     '/projects/tour-travel.png', 5);
  end if;

  if not exists (select 1 from public.skills) then
    insert into public.skills (category, items, sort_order) values
    ('Frontend', array['React.js','Next.js','TypeScript','JavaScript (ES6+)','HTML5','CSS3','Tailwind CSS','Redux Toolkit'], 1),
    ('Backend', array['Node.js','Express.js','REST APIs','JWT Authentication','Middleware'], 2),
    ('Database & storage', array['MongoDB','Mongoose','Supabase'], 3),
    ('Auth & services', array['Firebase Google OAuth','Socket.IO','PayPal','Cloudinary'], 4),
    ('Tools & deployment', array['Git','GitHub','Vercel','Netlify','Railway','Vite','VS Code'], 5);
  end if;

  if not exists (select 1 from public.education_items) then
    insert into public.education_items (kind, title, subtitle, sort_order) values
    ('education', 'Bachelor of Science in Information Technology (BS IT)', 'Government College University Faisalabad (GCUF) · 3rd year', 1),
    ('education', 'Intermediate', 'Punjab College, Gujranwala Campus', 2),
    ('certification', 'Dev Weekends Fellowship Certificate — July 2026', null, 1),
    ('certification', 'MS Office Certificate — Sunshine School, Gujranwala', null, 2);
  end if;

  if not exists (select 1 from public.site_settings) then
    insert into public.site_settings (key, value) values
    ('location', 'Hafizabad, Punjab, Pakistan'),
    ('about', $about$I'm a BS Information Technology student at Government College University Faisalabad and a full-stack developer who prefers finishing things over talking about them. Most of what I know comes from building complete applications rather than isolated exercises.

My strongest foundation is the MERN stack — React, Node.js, Express, and MongoDB — with authentication, REST APIs, and real-time features built in from the start. I've since added Next.js and TypeScript to that, and use them for anything that needs to scale cleanly or ship fast.

One of my projects, a restaurant POS system, is currently used for real daily order and sales operations — not a demo, an actual tool someone relies on. That's the standard I hold the rest of my work to.$about$);
  end if;
end
$seed$;
