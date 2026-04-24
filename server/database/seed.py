import os
import time
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from pathlib import Path
from supabase import create_client, Client

# Get current script directory
current_dir = Path(__file__).parent
server_dir = current_dir.parent

# Load .env
load_dotenv(server_dir / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL or not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials in .env")
    exit(1)

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Initialize Supabase REST Client & SQLAlchemy Engine
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
engine = create_engine(DATABASE_URL)

def seed_users():
    print("🌱 Memulai proses seeding akun...\n")
    users_to_create = [
        {
            "email": "adminpakarair@gmail.com", 
            "password": "password123", 
            "username": "admin_pakar", 
            "full_name": "Admin Pakar Air", 
            "is_admin": True
        },
        {
            "email": "userpakarair@gmail.com", 
            "password": "password123", 
            "username": "user_public", 
            "full_name": "Pengguna Publik", 
            "is_admin": False
        }
    ]

    for u in users_to_create:
        print(f"Membuat akun {u['email']}...")
        try:
            # Register user via Supabase Auth
            res = supabase.auth.sign_up({
                "email": u["email"],
                "password": u["password"],
                "options": {
                    "data": {
                        "full_name": u["full_name"],
                        "username": u["username"]
                    }
                }
            })
            print(f"✅ Berhasil mendaftar {u['email']}")
        except Exception as e:
            if "already registered" in str(e).lower() or "user already exists" in str(e).lower():
                print(f"⚠️ Akun {u['email']} sudah ada.")
            else:
                print(f"❌ Gagal membuat {u['email']}: {e}")

    # Tunggu sebentar agar Trigger Supabase selesai membuat data di tabel public.profiles
    print("\nMenunggu sinkronisasi profil...")
    time.sleep(3)

    # Update status is_admin secara langsung ke database
    # (Karena via Supabase Auth kita tidak bisa mengatur is_admin langsung demi keamanan RLS)
    print("\nMengatur hak akses Admin...")
    try:
        with engine.begin() as conn:
            # Set admin
            conn.execute(text("UPDATE public.profiles SET is_admin = true WHERE username = 'admin_pakar'"))
            # Set user biasa
            conn.execute(text("UPDATE public.profiles SET is_admin = false WHERE username = 'user_public'"))
        print("✅ Hak akses berhasil diperbarui!")
    except Exception as e:
        print(f"❌ Gagal memperbarui hak akses: {e}")
        
    print("\n🎉 Seeding selesai!")
    print("Gunakan kredensial berikut untuk login:")
    print("▶ Admin -> Email: adminpakarair@gmail.com | Pass: password123")
    print("▶ User  -> Email: userpakarair@gmail.com  | Pass: password123")

if __name__ == "__main__":
    seed_users()
