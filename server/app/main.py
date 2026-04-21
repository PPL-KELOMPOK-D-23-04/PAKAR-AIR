"""
PAKAR-AIR API — FastAPI Application Entry Point
Wires all routers and middleware.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api import auth, users, analysis, history, notifications, admin

app = FastAPI(
    title="PAKAR-AIR API",
    description="Sistem Pakar Klasifikasi Sanitasi Air — "
                "Menggabungkan Deep Learning (YOLOv8) dan Machine Learning (Random Forest)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS Middleware ─────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Static files (uploaded images) ──────────────────────────────
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ─── Root ────────────────────────────────────────────────────────
@app.get("/", tags=["Root"])
def read_root():
    return {
        "message": "Welcome to PAKAR-AIR API",
        "docs": "/docs",
        "version": "1.0.0",
    }

# ─── Include All Routers ─────────────────────────────────────────
app.include_router(auth.router,          prefix="/api/auth",          tags=["Auth"])
app.include_router(users.router,         prefix="/api/users",         tags=["Users"])
app.include_router(analysis.router,      prefix="/api/analysis",      tags=["Analysis"])
app.include_router(history.router,       prefix="/api/history",       tags=["History"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(admin.router,         prefix="/api/admin",         tags=["Admin"])
