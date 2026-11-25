from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session
from database import get_db
from models import User
from limiter import limiter
from schemas.response_models import RegisterResponse, LoginResponse
from core.jwt_handler import create_access_token
from core.config import TEST_USERS
from security import hash_password, verify_password
from schemas.user import UserCreate


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=RegisterResponse,
    summary="Neuen User registrieren",
    description="Erstellt einen Account mit E-Mail und Passwort."
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # 1. Gibt es die E-Mail schon?
    existing_user = db.scalar(select(User).where(User.email == user.email))
    if existing_user:
        raise HTTPException(status_code=400, detail="E-Mail ist bereits registriert!")

    # 2. Passwort hashen (bcrypt erlaubt höchstens 72 Bytes)
    try:
        hashed = hash_password(user.password)
    except ValueError:
        raise HTTPException(status_code=400, detail="Passwort darf höchstens 72 Bytes lang sein")

    # 3. User speichern
    new_user = User(email=user.email, hashed_password=hashed)
    db.add(new_user)
    db.commit()

    return {"message": "Registrierung erfolgreich", "email": new_user.email}


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Benutzer anmelden",
    description="Authentifiziert den Benutzer und gibt ein JWT-Token zurück."
)
@limiter.limit("5/minute")
def login_mock(request: Request, user: UserCreate):
    stored_user = TEST_USERS.get(user.email)

    if not stored_user or not verify_password(
        user.password,
        stored_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="E-Mail oder Passwort falsch"
        )

    access_token = create_access_token(email=user.email)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }