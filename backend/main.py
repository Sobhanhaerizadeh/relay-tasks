from fastapi import FastAPI
from routers import auth

app = FastAPI(title="Relay Backend")
app.include_router(auth.router)



@app.get("/")
def read_root():
    return "Backend läuft!"