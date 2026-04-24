import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("Error: DATABASE_URL not found in .env")
    exit(1)

# Ensure dialect is postgresql
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

print(f"Connecting to database...")
engine = create_engine(DATABASE_URL)

print("Reading schema.sql...")
with open("database/schema.sql", "r", encoding="utf-8") as f:
    sql_script = f.read()

print("Executing migration...")
try:
    with engine.begin() as conn:
        conn.execute(text(sql_script))
    print("Migration successful! Tables have been created.")
except Exception as e:
    print(f"Error during migration: {e}")
