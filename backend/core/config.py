from datetime import timedelta

# Secret Key (in Produktion: aus .env!)
SECRET_KEY = "your-secret-key-change-in-production-12345"
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