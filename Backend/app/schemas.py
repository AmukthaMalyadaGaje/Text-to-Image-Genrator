from pydantic import BaseModel
from bson import ObjectId


class MongoBaseModel(BaseModel):
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserInDB(MongoBaseModel):
    username: str
    email: str
    hashed_password: str
