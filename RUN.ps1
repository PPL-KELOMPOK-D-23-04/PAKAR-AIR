# ====================================================================
# PAKAR-AIR — Run Everything (Backend + Frontend)
# ====================================================================

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  PAKAR-AIR Project Launcher                               ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get repo root
$repoRoot = $PSScriptRoot

# 1. Activate Python venv
Write-Host "► Activating Python venv..." -ForegroundColor Yellow
$venvPath = "$repoRoot\.venv\Scripts\Activate.ps1"

if (-not (Test-Path $venvPath)) {
    Write-Host "  ✗ venv not found at $venvPath" -ForegroundColor Red
    Write-Host "  Creating venv..." -ForegroundColor Yellow
    & python -m venv "$repoRoot\.venv"
}

& $venvPath

# 2. Verify pip
Write-Host "► Checking pip..." -ForegroundColor Yellow
python -m ensurepip --default-pip 2>&1 | Out-Null

# 3. Verify dependencies
Write-Host "► Installing backend dependencies..." -ForegroundColor Yellow
pip install -q -r "$repoRoot\server\requirements.txt" 2>&1 | Out-Null
if ($?) { Write-Host "  ✓ Backend dependencies OK" -ForegroundColor Green }

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  READY TO START                                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "  Start BACKEND (this terminal):" -ForegroundColor Cyan
Write-Host "    python server\run.py" -ForegroundColor White
Write-Host "    → http://localhost:5000" -ForegroundColor Gray
Write-Host ""

Write-Host "  Start FRONTEND (new terminal):" -ForegroundColor Cyan
Write-Host "    cd frontend" -ForegroundColor White
Write-Host "    npm install" -ForegroundColor White
Write-Host "    npm run dev" -ForegroundColor White
Write-Host "    → http://localhost:5174 (or similar)" -ForegroundColor Gray
Write-Host ""

Write-Host "  Or run this for FRONTEND in new PowerShell:" -ForegroundColor Cyan
Write-Host "    cd $repoRoot\frontend; npm install; npm run dev" -ForegroundColor White
Write-Host ""

Write-Host "Now starting BACKEND..." -ForegroundColor Yellow
Write-Host ""

python server\run.py
