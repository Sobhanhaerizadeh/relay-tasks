from pydantic import BaseModel 

class TaskCreate (BaseModel):
    title : str 

class TaskOut (BaseModel):
    id : int
    title : str 
    status : str 
