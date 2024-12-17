import bcrypt
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.models import UserInDB
from app.db.mongodb import (
    users_collection,
)  # Assume users_collection is your MongoDB collection

# JWT Configuration
SECRET_KEY = "your-secret-key"  # Replace with a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password Hashing Configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash the password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify the password."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    """Generate JWT token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def create_user(user: UserInDB):
    """Create and save user to MongoDB."""
    user_dict = user.model_dump()
    print("user_dict", user_dict)
    # Store hashed password
    # user_dict["hashed_password"] = hash_password(user.password)
    user_dict["hashed_password"] = user.password
    # user_dict.pop("email", None)  # Remove plain password from the dict
    curruser = UserInDB(**user_dict, id="123")
    print("entering create_user")
    user_dict.pop("password", None)  # Remove plain password from the dict

    # Save user to MongoDB
    result = users_collection.insert_one(user_dict)
    print("result.inserted_id", result)
    curruser.id = str(result.inserted_id)  # Convert ObjectId to string

    return curruser


async def authenticate_user(email: str, password: str) -> UserInDB:
    """Authenticate user by checking email and password."""
    print("db_user", email)
    db_user = users_collection.find_one({"email": email})
    if not db_user:
        raise Exception("User not found")
    print("db_user", db_user)
    print("password", password)

    if not password == db_user["hashed_password"]:  # type: ignore
        raise Exception("Incorrect password")
    print("hashed_password", db_user["hashed_password"])

    return UserInDB(
        id=str(db_user["_id"]),
        email=db_user["email"],
        username=db_user["username"],
        hashed_password=db_user["hashed_password"],
    )
