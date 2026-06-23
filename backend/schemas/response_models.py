from pydantic import BaseModel, Field

class RegisterResponse(BaseModel):
    message: str = Field(..., example="Registrierung erfolgreich")
    email: str = Field(..., example="user@example.com")

class LoginResponse(BaseModel):
    message: str = Field(..., example="Login erfolgreich")
    token: str = Field(..., example="mock-jwt-token-xyz123")