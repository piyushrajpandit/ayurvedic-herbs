import requests
import sys
import os

def test_prediction(image_path="sample_leaf.jpg", api_url="http://localhost:8000"):
    # 1. Health check
    health_url = f"{api_url}/health"
    try:
        health_resp = requests.get(health_url)
        print("🏥 SERVER HEALTH CHECK:")
        print(health_resp.json())
        print("-" * 50)
    except Exception as e:
        print(f"❌ Failed to reach health endpoint at {health_url}: {e}")
        return

    # 2. Prediction request
    predict_url = f"{api_url}/predict"
    if not os.path.exists(image_path):
        print(f"⚠️ Image path '{image_path}' does not exist. Please pass a valid image filepath.")
        return

    with open(image_path, "rb") as img:
        files = {"file": (os.path.basename(image_path), img, "image/jpeg")}
        print(f"📡 Sending prediction request for '{image_path}' to {predict_url}...")
        response = requests.post(predict_url, files=files)
        
    if response.status_code == 200:
        data = response.json()
        print("🌿 IDENTIFICATION RESULTS:")
        print(f"Top Identified Species : {data['species']}")
        print(f"Confidence             : {data['confidence'] * 100:.2f}%")
        print(f"Inference Latency      : {data['inference_time_ms']} ms")
        print("\nTop 3 Candidate Species:")
        for idx, item in enumerate(data['top_3'], 1):
            print(f"  {idx}. {item['species']}: {item['confidence'] * 100:.2f}%")
    else:
        print(f"❌ Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    img_file = sys.argv[1] if len(sys.argv) > 1 else "sample_leaf.jpg"
    test_prediction(img_file)
