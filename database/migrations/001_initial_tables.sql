-- Migration 001: Initial Tables
-- Applied: 2025-07-30
-- Status: ✅ COMPLETED

-- User profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email character varying NOT NULL UNIQUE,
  name character varying,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- FlareBot configurations table
CREATE TABLE public.flarebots (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  name character varying NOT NULL,
  personality text,
  voice character varying DEFAULT 'Charon'::character varying,
  knowledge_base text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT flarebots_pkey PRIMARY KEY (id),
  CONSTRAINT flarebots_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flarebots ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own flarebots" ON public.flarebots
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create flarebots" ON public.flarebots
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flarebots" ON public.flarebots
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flarebots" ON public.flarebots
    FOR DELETE USING (auth.uid() = user_id);
