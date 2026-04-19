from ultralytics import YOLO

# load model
model = YOLO("yolov8n.pt")

# train
model.train(
    data="data.yaml",
    epochs=50,
    imgsz=640
)