import os
import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
import kagglehub

# Set seeds for reproducibility
tf.keras.utils.set_random_seed(42)

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS_STAGE1 = 12
EPOCHS_STAGE2 = 10


def load_dataset_from_kaggle():
    print("📥 Downloading Indian Medicinal Leaves Dataset via kagglehub...")
    dataset_path = kagglehub.dataset_download("arunrk7/indian-medicinal-leaves-dataset")
    print(f"✅ Dataset available at: {dataset_path}")
    
    # Locate dataset root directory
    subdirs = [os.path.join(dataset_path, d) for d in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, d))]
    if len(subdirs) == 1:
        data_dir = subdirs[0]
    else:
        data_dir = dataset_path
    
    # Check if there is an 'Indian Medicinal Leaves Dataset' subfolder inside
    nested_dir = os.path.join(data_dir, "Indian Medicinal Leaves Dataset")
    if os.path.exists(nested_dir):
        data_dir = nested_dir
        
    return data_dir


def create_splits(data_dir):
    print("📊 Creating Train (80%), Validation (10%), and Test (10%) splits...")
    
    # Full dataset split into 80% train and 20% temp (val + test)
    train_ds = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="training",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode="int"
    )

    temp_ds = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="validation",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode="int"
    )

    class_names = temp_ds.class_names
    num_classes = len(class_names)
    print(f"🌿 Identified {num_classes} species classes.")

    # Save class index mapping to JSON for FastAPI inference
    class_indices = {i: name for i, name in enumerate(class_names)}
    with open("class_indices.json", "w") as f:
        json.dump(class_indices, f, indent=4)
    print("💾 Saved class index mapping to 'class_indices.json'")

    # Split temp_ds equally into val (10%) and test (10%)
    temp_batches = tf.data.experimental.cardinality(temp_ds).numpy()
    val_batches = temp_batches // 2

    val_ds = temp_ds.take(val_batches)
    test_ds = temp_ds.skip(val_batches)

    # Prefetch for performance
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
    test_ds = test_ds.cache().prefetch(buffer_size=AUTOTUNE)

    return train_ds, val_ds, test_ds, class_names, num_classes


def build_model(num_classes):
    print("🏗️ Constructing MobileNetV2 Architecture with Augmentation Head...")
    
    # Data Augmentation layer built into model graph
    data_augmentation = tf.keras.Sequential([
        tf.keras.layers.RandomFlip("horizontal_and_vertical"),
        tf.keras.layers.RandomRotation(0.25),
        tf.keras.layers.RandomZoom(0.2),
        tf.keras.layers.RandomTranslation(0.1, 0.1),
        tf.keras.layers.RandomContrast(0.2),
    ], name="data_augmentation")

    # Base pretrained model
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False  # Freeze base layers for Stage 1

    inputs = tf.keras.Input(shape=(224, 224, 3))
    x = data_augmentation(inputs)
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)
    x = base_model(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.BatchNormalization()(x)
    x = tf.keras.layers.Dense(256, activation="relu")(x)
    x = tf.keras.layers.Dropout(0.4)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax")(x)

    model = tf.keras.Model(inputs, outputs, name="ayush_plant_mobilenet")
    return model, base_model


def train_model(model, base_model, train_ds, val_ds):
    # Phase 1: Train classification head
    print("🚀 Stage 1: Training Classification Head (Base Frozen)...")
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )

    callbacks = [
        tf.keras.callbacks.EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True),
        tf.keras.callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, verbose=1)
    ]

    history1 = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS_STAGE1,
        callbacks=callbacks
    )

    # Phase 2: Fine-tuning top layers of base model
    print("🔓 Stage 2: Fine-Tuning Top Base Layers of MobileNetV2...")
    base_model.trainable = True
    
    # Freeze initial 100 layers, fine-tune remaining top layers
    for layer in base_model.layers[:100]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )

    history2 = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS_STAGE2,
        callbacks=callbacks
    )

    return model


def evaluate_and_export(model, test_ds, class_names):
    print("📊 Evaluating Model on Test Set...")
    
    y_true = []
    y_pred = []

    for images, labels in test_ds:
        preds = model.predict(images, verbose=0)
        y_true.extend(labels.numpy())
        y_pred.extend(np.argmax(preds, axis=1))

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    # Classification Report
    report_dict = classification_report(y_true, y_pred, target_names=class_names, output_dict=True)
    report_str = classification_report(y_true, y_pred, target_names=class_names)
    
    print("\n--- PER-CLASS ACCURACY & EVALUATION REPORT ---")
    print(report_str)

    with open("evaluation_report.json", "w") as f:
        json.dump(report_dict, f, indent=4)

    # Confusion Matrix
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(14, 12))
    sns.heatmap(cm, annot=False, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.title("Medicinal Plant Identification - Confusion Matrix")
    plt.xlabel("Predicted Species")
    plt.ylabel("True Species")
    plt.xticks(rotation=90, fontsize=8)
    plt.yticks(fontsize=8)
    plt.tight_layout()
    plt.savefig("confusion_matrix.png", dpi=300)
    plt.close()
    print("🖼️ Confusion Matrix heatmap saved as 'confusion_matrix.png'")

    # Model Export
    print("💾 Exporting models...")
    model.save("medicinal_plant_model.h5")
    model.save("medicinal_plant_model.keras")
    model.save("medicinal_plant_model_savedmodel")
    print("✅ Successfully exported 'medicinal_plant_model.h5', '.keras', and 'medicinal_plant_model_savedmodel' directory!")


if __name__ == "__main__":
    data_dir = load_dataset_from_kaggle()
    train_ds, val_ds, test_ds, class_names, num_classes = create_splits(data_dir)
    model, base_model = build_model(num_classes)
    trained_model = train_model(model, base_model, train_ds, val_ds)
    evaluate_and_export(trained_model, test_ds, class_names)
