---
title: AYUSH Medicinal Plant Identification API
emoji: 🌿
colorFrom: green
colorTo: emerald
sdk: docker
app_port: 7860
pinned: false
---

# AYUSH Medicinal Plant & Raw Material Identification API (SIH260170)

This is the Hugging Face Docker Space hosting the TensorFlow/FastAPI ML inference service for identifying Indian medicinal plant leaves and raw materials.

## Endpoints
- `GET /health` - Service health status
- `POST /predict` - Image classification accepting multipart file uploads
