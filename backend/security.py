from passlib.context import CryptContext



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str) -> str:
    """
    Hasht ein Passwort mit bcrypt und gibt den Hash zurück.
    """
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Vergleicht ein Klartext-Passwort mit einem gespeicherten Hash.
    Gibt True bei Übereinstimmung zurück, sonst False.
    Gibt ebenfalls False zurück, wenn der Hash ungültig ist.
    """
    try:
        return pwd_context.verify(password, hashed_password)
    except ValueError:
        return False
