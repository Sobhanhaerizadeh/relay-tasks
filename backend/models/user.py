from datetime import date, datetime
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class User (Base):
    __tablename__ = "users"
    __table_args__ = {"sqlite_autoincrement": True}


    user_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str | None] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]
    birthday: Mapped[date | None]
    profile_pic: Mapped[str | None]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    last_login: Mapped[datetime | None]
