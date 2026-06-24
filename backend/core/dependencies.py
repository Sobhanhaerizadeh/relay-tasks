from jose import JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from core.config import TEST_USERS
from core.jwt_handler import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    auto_error=False
)


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Prüft das Token und gibt den aktuell eingeloggten Benutzer zurück."""
    if token is None:
        raise HTTPException(
            status_code=403,
            detail="Token fehlt"
        )

    try:
        payload = decode_access_token(token)
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Ungültiges oder abgelaufenes Token"
        )

    user = TEST_USERS.get(payload.get("email"))

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Benutzer nicht gefunden"
        )

    return user
