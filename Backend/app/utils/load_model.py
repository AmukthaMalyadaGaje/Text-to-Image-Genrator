from transformers import pipeline

def load_text_to_image_model():
    return pipeline("text-to-image-generation")
