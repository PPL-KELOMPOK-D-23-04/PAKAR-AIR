from ultralytics import YOLO

# load model
model = YOLO("runs/detect/train/weights/best.pt")

# predict gambar
results = model.predict(
    source="sungai_sampah.jpeg",   
    show=True,           
    save=True           
)