-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS (Hanya untuk Status Analisis)
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
    is_admin boolean DEFAULT false, -- Pakai Boolean sesuai permintaan Anda
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
    is_read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- 9. RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
