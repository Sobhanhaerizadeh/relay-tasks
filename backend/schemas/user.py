from pydantic import BaseModel
from uuid import UUID

class UserCreate(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: UUID
    email: str