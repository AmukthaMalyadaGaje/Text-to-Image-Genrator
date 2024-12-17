from pydantic import BaseModel
from typing import Optional

from bson import ObjectId


class User(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserInDB(BaseModel):
    id: str
    username: str
    email: str
    hashed_password: str  # hashed password stored in the DB

    class Config:
        # For compatibility with MongoDB's ObjectId field
        json_encoders = {ObjectId: str}


class Token(BaseModel):
    access_token: str
    token_type: str


class ImageRequest(BaseModel):
    prompt: str
    seed: Optional[int] = None
