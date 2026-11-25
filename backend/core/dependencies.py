from jose import JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session
from core.jwt_handler import decode_access_token
from database import get_db
from models import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    auto_error=False
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Bitte neu einloggen"
        )

    try:
        payload = decode_access_token(token)
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Bitte neu einloggen"
        )

    user = db.scalar(select(User).where(User.email == payload.get("email")))

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Bitte neu einloggen"
        )

    return user