from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str


class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    task_id: int
    title: str
    status: str
    owner_id: int