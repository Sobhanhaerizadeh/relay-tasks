from fastapi import FastAPI

app = FastAPI(title="Relay Backend")

@app.get("/")
def read_root():
    return "Backend läuft!"