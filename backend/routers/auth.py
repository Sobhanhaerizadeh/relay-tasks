from fastapi import APIRouter, Request, HTTPException
from limiter import limiter
from schemas.response_models import RegisterResponse, LoginResponse
from schemas.user import UserCreate
from token_utils import create_access_token

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
def login_mock(user: UserCreate, request: Request):
    #Fur Test 
    if user.email != "user@example.com" or user.password != "test123":
        raise HTTPException(
            status_code=401,
            detail="Ungültige Zugangsdaten"
        )

    access_token = create_access_token(
        {"sub": user.email}
    )

    return {
        "message": "Login erfolgreich",
        "token": access_token
    }