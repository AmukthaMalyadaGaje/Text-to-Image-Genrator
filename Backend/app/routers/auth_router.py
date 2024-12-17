from fastapi import APIRouter, HTTPException
from app.models import User, Token, UserLogin
from app.services.auth_service import (
    create_user,
    authenticate_user,
    create_access_token,
)
from datetime import timedelta

router = APIRouter()


@router.post("/signup", response_model=Token)
async def signup(user: User):
    """Signup route for new users."""
    try:
        # Log user input for debugging purposes
        print("Received user data:", user)

        # Call the service to create the user (handles password hashing internally)
        user = await create_user(user)

        # Create an access token for the newly created user
        access_token = create_access_token(data={"sub": user.username})

        return {"access_token": access_token, "token_type": "bearer"}

    except Exception as e:
        # Log the error and raise an HTTPException
        print(f"Error during signup: {str(e)}")
        raise HTTPException(
            status_code=400, detail="Signup failed. Please check your input."
        )


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    """Login route for existing users."""
    try:
        # Authenticate user
        db_user = await authenticate_user(user.email, user.password)
        print("user", db_user)

        # Create an access token for the user
        access_token = create_access_token(data={"sub": db_user.email})
        return {"access_token": access_token, "token_type": "bearer"}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
