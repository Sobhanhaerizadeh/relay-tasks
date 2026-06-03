from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)
@router.post("/register")
def register_mock():
    return {"message": "Registrierung erfolgreich"}


@router.post("/login")


def login_mock():

    return "Login erfolgreich"