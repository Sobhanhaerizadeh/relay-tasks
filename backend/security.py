import bcrypt

# bcrypt berücksichtigt höchstens 72 Bytes eines Passworts.
MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
    """
    Hasht ein Passwort mit bcrypt und gibt den Hash zurück.
    Wirft ValueError, wenn das Passwort länger als 72 Bytes ist.
    """
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > MAX_PASSWORD_BYTES:
        raise ValueError("Passwort darf höchstens 72 Bytes lang sein")
    return bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    """
    Vergleicht ein Klartext-Passwort mit einem gespeicherten Hash.
    Gibt True bei Übereinstimmung zurück, sonst False.
    Gibt ebenfalls False zurück, wenn der Hash ungültig ist.
    """
    try:
        return bcrypt.checkpw(
            password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except ValueError:
        return False
