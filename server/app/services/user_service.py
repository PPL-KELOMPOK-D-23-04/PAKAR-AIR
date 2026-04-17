from app.models.profile import Profile


def update_user_status(db, user_id: str, is_active: bool):
    user = db.query(Profile).filter(Profile.id == user_id).first()

    if not user:
        return None

    user.is_active = is_active
    db.commit()
    db.refresh(user)

    return user