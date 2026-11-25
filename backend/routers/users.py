from fastapi import APIRouter, Depends
from core.dependencies import get_current_user
from schemas.response_models import MeResponse
from models import User

router = APIRouter(
    tags=["Users"]
)

@router.get(
    "/me",
    response_model=MeResponse,
    summary="Aktuellen Benutzer abrufen",
    description="Gibt die Daten des eingeloggten Benutzers anhand des Tokens zurück."
)
def get_me(current_user: User = Depends(get_current_user)):
    return {"email": current_user.email}