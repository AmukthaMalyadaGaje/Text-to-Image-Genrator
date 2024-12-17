from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth_router, image_router

# Create FastAPI app instance
app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Allow your frontend to make requests from localhost (React development server)
    "http://localhost:5174",  # Allow your frontend to make requests from localhost (React development server)
    "https://your-frontend-domain.com",  # Allow your deployed frontend (if any)
    # You can add more origins if needed, like for production and staging environments.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to access the API
    allow_credentials=True,  # Allow cookies or other credentials
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include the routers for auth and image generation
app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(image_router.router, prefix="/image", tags=["Image Generation"])


@app.get("/")
def root():
    return {"message": "Welcome to the Text to Image Generator API!"}
