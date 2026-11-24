from fastapi import APIRouter, Depends
from schemas.task import TaskCreate, TaskOut
from core.dependencies import get_current_user


TASKS = [
    {
        "id": 1,
        "title": "Login implementieren",
        "status": "open"
    },
    {
        "id": 2,
        "title": "API testen",
        "status": "done"
    }
]


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.get(
    "/",
    response_model=list[TaskOut],
    summary="Alle Tasks abrufen"
)
def get_tasks(current_user: dict = Depends(get_current_user)):
    return TASKS


@router.post(
    "/",
    response_model=TaskOut,
    summary="Neue Task erstellen"
)
def create_task(
    task: TaskCreate,
    current_user: dict = Depends(get_current_user)
):
    new_task = {
        "id": len(TASKS) + 1,
        "title": task.title,
        "status": "open"
    }

    TASKS.append(new_task)

    return new_task