-- ============================================================
-- PAKAR-AIR Database Schema for Supabase
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLE: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name text NOT NULL,
    username text UNIQUE NOT NULL,
    avatar_url text,
    is_admin boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. TABLE: analyses
CREATE TABLE IF NOT EXISTS public.analyses (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    status analysis_status DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

-- 5. TABLE: image_inputs
CREATE TABLE IF NOT EXISTS public.image_inputs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    analysis_id uuid REFERENCES public.analyses(id) ON DELETE CASCADE,
    image_path text NOT NULL,
    original_filename text,
    created_at timestamptz DEFAULT now()
);

-- 6. TABLE: manual_inputs
CREATE TABLE IF NOT EXISTS public.manual_inputs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    analysis_id uuid REFERENCES public.analyses(id) ON DELETE CASCADE,
    data_json jsonb,
    created_at timestamptz DEFAULT now()
);

-- 7. TABLE: analysis_results
CREATE TABLE IF NOT EXISTS public.analysis_results (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    analysis_id uuid REFERENCES public.analyses(id) ON DELETE CASCADE,
    category text,
    confidence float,
    dl_category text,
    dl_confidence float,
    dl_detections jsonb,
    ml_category text,
    ml_confidence float,
    ml_feature_importance jsonb,
    explanation text,
    recommendation text,
    raw_output jsonb,
    created_at timestamptz DEFAULT now()
);

-- 8. TABLE: notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    analysis_id uuid REFERENCES public.analyses(id) ON DELETE SET NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text DEFAULT 'info',
    is_read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Catatan: education_articles di-hardcode di backend Python,
-- tidak disimpan di database.

-- 10. ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.image_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manual_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;


-- Profiles: users can view own, admins can view all
CREATE POLICY "Users view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Analyses: users can view own
CREATE POLICY "Users view own analyses" ON public.analyses
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own analyses" ON public.analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);



-- 11. TRIGGER: auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();



-- 12. TRIGGER: auto-create profile on Supabase auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, username)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'username', NEW.email)
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
