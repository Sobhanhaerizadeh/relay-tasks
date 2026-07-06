import os
from dotenv import load_dotenv
from security import hash_password
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

if SECRET_KEY is None:
    raise ValueError("SECRET_KEY is missing")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Test-Benutzer (hardcoded)
TEST_USERS = {
    "test@example.com": {
        "password": hash_password("password123"),
        "email": "test@example.com"
    },
    "admin@example.com": {
        "password": hash_password("admin123"),
        "email": "admin@example.com"
    }
}