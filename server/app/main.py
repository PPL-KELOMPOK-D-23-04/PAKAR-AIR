from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PAKAR-AIR API",
    description="Sistem Pakar Klasifikasi Sanitasi Air",
    version="1.0.0"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to PAKAR-AIR API"}

# Include routers here later
# from app.api.auth import router as auth_router
# app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
