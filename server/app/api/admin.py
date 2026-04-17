from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_admin
from app.schemas.user_schema import UserStatusUpdate
from app.services.user_service import update_user_status

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.put("/users/{user_id}/status")
def change_user_status(
    user_id: str,
    payload: UserStatusUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    user = update_user_status(db, user_id, payload.is_active)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "User status updated successfully",
        "user_id": user.id,
        "is_active": user.is_active
    }