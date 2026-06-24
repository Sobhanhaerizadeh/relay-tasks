import os

SECRET_KEY = os.getenv("SECRET_KEY")

if SECRET_KEY is None:
    raise ValueError("SECRET_KEY is missing")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Test-Benutzer (hardcoded)
TEST_USERS = {
    "test@example.com": {
        "password": "password123",
        "email": "test@example.com"
    },
    "admin@example.com": {
        "password": "admin123",
        "email": "admin@example.com"
    }
}