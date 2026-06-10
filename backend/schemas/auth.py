from pydantic import BaseModel

class RegisterResponse(BaseModel):
    message: str
    email: str

class LoginResponse(BaseModel):
    message: str
    token: str