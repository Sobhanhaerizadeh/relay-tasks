from fastapi import APIRouter, Request
from limiter import limiter
from schemas.response_models import RegisterResponse, LoginResponse



router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=RegisterResponse)
def register_mock():
    return {
        "message": "Registrierung erfolgreich",
        "email": "user@example.com"
    }

@router.post("/login", response_model=LoginResponse)
@limiter.limit("5/minute")
def login_mock(request: Request):
    return {
        "message": "Login erfolgreich",
        "token": "mock-jwt-token-xyz123"
    }