import os
import tensorflow as tf

def convert_to_tflite(model_path="medicinal_plant_model.h5", output_tflite="medicinal_plant_model_quantized.tflite"):
    if not os.path.exists(model_path):
        print(f"⚠️ Model file '{model_path}' not found.")
        return

    print(f"📦 Loading model from '{model_path}' for TFLite quantization...")
    model = tf.keras.models.load_model(model_path)

    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    # Enable INT8 / FP16 optimizations
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16]

    tflite_model = converter.convert()

    with open(output_tflite, "wb") as f:
        f.write(tflite_model)

    size_mb = os.path.getsize(output_tflite) / (1024 * 1024)
    print(f"✅ Successfully converted model to TFLite!")
    print(f"📄 Output file: {output_tflite}")
    print(f"⚡ Quantized Model Size: {size_mb:.2f} MB (Optimized for Mobile/Edge AI)")

if __name__ == "__main__":
    convert_to_tflite()
