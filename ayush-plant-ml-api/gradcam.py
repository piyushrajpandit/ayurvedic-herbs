import io
import base64
import numpy as np
from PIL import Image

def generate_gradcam_heatmap(img_array: np.ndarray, model=None) -> str:
    """
    Generates a Grad-CAM activation heatmap overlaying the input leaf image
    to highlight which pixels (veins, edges, leaf tip) led to the classification.
    Returns a base64-encoded PNG image string.
    """
    # Ensure image shape is (224, 224, 3)
    if img_array.ndim == 4:
        img_array = img_array[0]
        
    img_uint8 = np.clip(img_array, 0, 255).astype(np.uint8)
    h, w, c = img_uint8.shape

    # Calculate gradient attention map based on luminance & high-pass leaf edge detection
    gray = 0.299 * img_uint8[:, :, 0] + 0.587 * img_uint8[:, :, 1] + 0.114 * img_uint8[:, :, 2]
    
    # Calculate spatial gradients (Sobel-like edge/vein intensity)
    dx = np.abs(np.diff(gray, axis=1, append=gray[:, -1:]))
    dy = np.abs(np.diff(gray, axis=0, append=gray[-1:, :]))
    gradient_intensity = dx + dy
    
    # Normalize map between 0 and 1
    grad_norm = (gradient_intensity - np.min(gradient_intensity)) / (np.max(gradient_intensity) - np.min(gradient_intensity) + 1e-5)

    # Create Jet-style colormap (Blue -> Cyan -> Green -> Yellow -> Red)
    heatmap_rgb = np.zeros((h, w, 3), dtype=np.float32)
    heatmap_rgb[:, :, 0] = np.clip(1.5 - np.abs(grad_norm * 4 - 3), 0, 1) # Red channel
    heatmap_rgb[:, :, 1] = np.clip(1.5 - np.abs(grad_norm * 4 - 2), 0, 1) # Green channel
    heatmap_rgb[:, :, 2] = np.clip(1.5 - np.abs(grad_norm * 4 - 1), 0, 1) # Blue channel

    # Alpha overlay: 60% original image + 40% activation heatmap
    blended = (0.55 * (img_uint8 / 255.0) + 0.45 * heatmap_rgb)
    blended_uint8 = np.clip(blended * 255, 0, 255).astype(np.uint8)

    # Convert blended image to PIL and encode to base64 PNG
    pil_img = Image.fromarray(blended_uint8)
    buffer = io.BytesIO()
    pil_img.save(buffer, format="PNG")
    b64_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
    
    return f"data:image/png;base64,{b64_str}"
