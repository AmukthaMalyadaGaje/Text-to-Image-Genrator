import httpx
from fastapi import HTTPException

FAL_API_URL = (
    "https://api.fal.ai/real-time/fast-lightning-sdxl"  # Example URL for FAL AI service
)
FAL_API_KEY = "26fc75b8-3a3d-42c2-babf-d1286b2797fe:ae2ae8ce20230d126e7f5f78332cf2c1"


async def generate_image(prompt: str, seed: int):
    data = {
        "prompt": prompt,
        "seed": seed,
        "num_images": 1,
        "image_size": "square_hd",
        "sync_mode": True,
        "num_inference_steps": "4",
    }

    headers = {
        "Authorization": f"Bearer {FAL_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(FAL_API_URL, json=data, headers=headers)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code, detail="Error generating image"
        )

    return response.json()
