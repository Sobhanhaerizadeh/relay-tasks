from pydantic import BaseModel, Field

class RegisterResponse(BaseModel):
    message: str = Field(..., example="Registrierung erfolgreich")
    email: str = Field(..., example="user@example.com")

class LoginResponse(BaseModel):
    access_token: str = Field(..., example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    token_type: str = Field(default="bearer", example="bearer")