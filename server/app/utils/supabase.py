import os
from supabase import create_client, Client
from app.config import settings

# Initialize Supabase client
# SUPABASE_URL and SUPABASE_KEY (Anon Key) from settings
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_supabase():
    return supabase
