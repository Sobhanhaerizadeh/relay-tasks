from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from core.dependencies import get_current_user
from database import get_db
from models import Task, User
from schemas.task import TaskCreate, TaskOut


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.get(
    "/",
    response_model=list[TaskOut],
    summary="Alle Tasks abrufen"
)
def get_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Das Team sieht alle Aufgaben, die neueste zuerst
    return db.scalars(select(Task).order_by(Task.task_id.desc())).all()


@router.post(
    "/",
    response_model=TaskOut,
    summary="Neue Task erstellen"
)
def create_task(
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # owner_id kommt immer vom eingeloggten User, nie vom Frontend
    new_task = Task(title=task.title, owner_id=current_user.user_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task