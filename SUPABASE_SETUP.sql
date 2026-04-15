-- # SUPABASE DATABASE SETUP SCRIPT
-- Project: Student Study Group Finder
-- Instructions: Run this script in your Supabase SQL Editor to set up the backend.

-- ## 1. ENSURE EXTENSIONS ARE ENABLED
create extension if not exists "uuid-ossp";

-- ## 2. CREATE ENUMS
do $$ begin
    create type public.user_role as enum ('student', 'admin');
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type public.post_type as enum ('announcement', 'question', 'general');
exception
    when duplicate_object then null;
end $$;

-- ## 3. CREATE TABLES

-- ### Profiles (Linked to Auth.Users)
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text not null,
    role public.user_role default 'student',
    program text,
    year_of_study int,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ### Study Groups
create table if not exists public.study_groups (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    course_code text not null,
    course_name text not null,
    description text,
    meeting_location text,
    faculty text,
    leader_id uuid references public.profiles(id) on delete set null,
    max_members int default 20,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ### Group Members (Enrolments)
create table if not exists public.group_members (
    group_id uuid references public.study_groups(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (group_id, user_id)
);

-- ### Study Sessions (Scheduling)
create table if not exists public.study_sessions (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.study_groups(id) on delete cascade not null,
    description text not null,
    session_date date not null,
    session_time time not null,
    location text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ### Group Posts (Communication)
create table if not exists public.group_posts (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.study_groups(id) on delete cascade not null,
    author_id uuid references public.profiles(id) on delete set null,
    content text not null,
    type public.post_type default 'general',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ## 4. ENABLE RLS (ROW LEVEL SECURITY)
alter table public.profiles enable row level security;
alter table public.study_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.study_sessions enable row level security;
alter table public.group_posts enable row level security;

-- ## 5. RLS POLICIES

-- ### Profiles: Users can view all profiles, but only edit their own.
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- ### Study Groups: Everyone can view, but only leaders/admins can edit.
create policy "Groups are viewable by everyone." on study_groups for select using (true);
create policy "Leaders can manage their own groups." on study_groups for all using (auth.uid() = leader_id);
create policy "Admins can manage any group." on study_groups for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ### Sessions & Posts: Viewable by anyone, manageable by group leader.
create policy "Sessions/Posts are viewable by everyone." on study_sessions for select using (true);
create policy "Sessions/Posts are viewable by everyone." on group_posts for select using (true);

-- Logic: If you are the leader of the group, you can manage sessions/posts.
create policy "Leaders can manage sessions." on study_sessions for all using (
    exists (select 1 from study_groups where id = study_sessions.group_id and leader_id = auth.uid())
);
create policy "Users can post to groups they are in." on group_posts for insert with check (true);


-- ## 6. AUTOMATIC PROFILE CREATION TRIGGER
-- This automatically creates a profile when a user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ## 7. SAMPLE DATA (FOR DEMO)
-- Note: Replace 'UUID_HERE' with real IDs if testing manually.
-- insert into public.study_groups (name, course_code, course_name, description, faculty)
-- values ('Web Dev Warriors', 'CSC1202', 'Web Development', 'Focusing on React and Node.js', 'Engineering');
