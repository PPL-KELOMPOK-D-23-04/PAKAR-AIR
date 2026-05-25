-- ============================================================
-- PAKAR-AIR Chatbot Schema — Run AFTER schema.sql
-- Separate file to avoid interfering with existing tables.
-- Run this in Supabase SQL Editor.
-- ============================================================

-- 1. TABLE: chat_sessions
-- Stores per-admin conversation sessions with the AI chatbot.
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title text DEFAULT 'Chat Baru',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. TABLE: chat_messages
-- Stores individual messages within a chat session.
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id uuid REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
    role text NOT NULL CHECK (role IN ('user', 'assistant')),
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 3. INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id
    ON public.chat_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id
    ON public.chat_messages(session_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at
    ON public.chat_messages(created_at);

-- 4. ROW LEVEL SECURITY
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- chat_sessions: admins can view their own sessions
CREATE POLICY "Users view own chat sessions" ON public.chat_sessions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own chat sessions" ON public.chat_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own chat sessions" ON public.chat_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- chat_messages: users can view messages from their own sessions
CREATE POLICY "Users view own chat messages" ON public.chat_messages
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM public.chat_sessions WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Users create chat messages in own sessions" ON public.chat_messages
    FOR INSERT WITH CHECK (
        session_id IN (
            SELECT id FROM public.chat_sessions WHERE user_id = auth.uid()
        )
    );

-- 5. TRIGGER: auto-update updated_at on chat_sessions
CREATE TRIGGER on_chat_sessions_updated
    BEFORE UPDATE ON public.chat_sessions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
