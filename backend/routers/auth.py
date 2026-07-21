from fastapi import APIRouter, Request, HTTPException
from limiter import limiter
from schemas.response_models import RegisterResponse, LoginResponse
from core.jwt_handler import create_access_token
from core.config import TEST_USERS
from security import verify_password
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
def register_mock(user: UserCreate):
    return {
        "message": "Registrierung erfolgreich",
        "email": user.email
    }


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Benutzer anmelden",
    description="Authentifiziert den Benutzer und gibt ein JWT-Token zurück."
)
@limiter.limit("5/minute")
def login_mock(request: Request, user: UserCreate):
    user = TEST_USERS.get(user.email)

    if not user or not verify_password(user.password, user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Ungültige Zugangsdaten"
        )

    access_token = create_access_token(email=user.email)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }