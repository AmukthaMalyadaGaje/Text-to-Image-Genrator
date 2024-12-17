from fastapi import APIRouter, Depends
from app.models import ImageRequest
from app.services.image_service import generate_image

router = APIRouter()


@router.post("/generate_image")
async def generate_image_endpoint(request: ImageRequest):
    result = await generate_image(request.prompt, request.seed)
    return result
