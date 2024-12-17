import uuid
from PIL import Image
import torch
import warnings
from diffusers import StableDiffusionPipeline

# Suppress specific deprecation warnings
warnings.filterwarnings("ignore", category=FutureWarning)

# Load the pre-trained Stable Diffusion model pipeline
model_id = "runwayml/stable-diffusion-v1-5"
text_to_image_pipeline = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
text_to_image_pipeline = text_to_image_pipeline.to("cuda")  # Use CUDA if available for faster inference

def generate_image(prompt: str) -> str:
    # Generate image from the prompt
    image = text_to_image_pipeline(prompt).images[0]  # Get the generated image from pipeline

    # Save image to a static folder with a unique filename
    image_path = f"static/{uuid.uuid4()}.png"
    image.save(image_path)
    return image_path

# Example usage
if __name__ == "__main__":
    prompt = "A futuristic cityscape at sunset"
    generated_image_path = generate_image(prompt)
    print(f"Generated image saved to: {generated_image_path}")
