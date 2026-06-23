from fastapi import APIRouter, Request
from limiter import limiter
from schemas.response_models import RegisterResponse, LoginResponse



router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=RegisterResponse ,
            summary="Neuen User registrieren",
            description="Erstellt einen Account mit E-Mail und Passwort.")
def register_mock():
    return {
        "message": "Registrierung erfolgreich",
        "email": "user@example.com"
    }

@router.post("/login", response_model=LoginResponse ,
            summary="Benutzer anmelden",
            description="Authentifiziert den Benutzer und gibt ein JWT-Token zurück.")
@limiter.limit("5/minute")
def login_mock(request: Request):
    return {
        "message": "Login erfolgreich",
        "token": "mock-jwt-token-xyz123"
    }