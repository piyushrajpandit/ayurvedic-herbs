# AYUSH Medicinal Plant Identification ML Service (SIH260170)

This repository contains the Machine Learning training script and FastAPI inference service for identifying 40 species of Indian medicinal plants and raw materials from leaf/plant images.

## Features
- **Transfer Learning**: MobileNetV2 pretrained on ImageNet with fine-tuned top layers.
- **Robust Augmentation**: Rotation, flip, zoom, contrast, and brightness handling for field condition variation.
- **FastAPI Service**: Low-latency REST API with startup model loading, `/predict`, `/health`, and CORS support.
- **Containerized Deployment**: Sized for HuggingFace Spaces Docker SDK (port 7860) and Render CPU Free Tier.

## Setup & Training
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Train model and evaluate performance
python train.py
```

## Running Local API
```bash
uvicorn main:app --reload --port 8000
```

## Testing Endpoint
```bash
python test_api.py sample_leaf.jpg
```
