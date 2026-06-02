import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# We need the user id to update the password using admin auth
res = supabase.auth.admin.list_users()
for user in res:
    if user.email == "userpakarair@gmail.com":
        supabase.auth.admin.update_user_by_id(user.id, {"password": "password123"})
        print(f"Reset password for {user.email}")
