# Model Specification & Input Requirements

Dokumentasi ini menjelaskan spesifikasi input dan output untuk model Machine Learning (Random Forest) dan Deep Learning (YOLOv8) yang digunakan dalam proyek PAKAR-AIR.

## 1. Random Forest (Water Potability Classification)
Model ini memprediksi apakah air layak minum (potable) atau tidak berdasarkan parameter kimia air.

- **Model File**: `random_forest_model.pkl`
- **Scaler File**: `scaler.pkl` (StandardScaler)
- **Input Features (Urutan harus tepat)**:
    1.  `ph`: Nilai pH air (0 - 14).
    2.  `Hardness`: Kapasitas air untuk mengendapkan sabun (mg/L).
    3.  `Solids`: Total padatan terlarut (ppm).
    4.  `Chloramines`: Jumlah kloramin (ppm).
    5.  `Sulfate`: Jumlah sulfat terlarut (mg/L).
    6.  `Conductivity`: Konduktivitas listrik air (μS/cm).
    7.  `Organic_carbon`: Jumlah karbon organik (ppm).
    8.  `Trihalomethanes`: Jumlah Trihalomethanes (μg/L).
    9.  `Turbidity`: Ukuran kejernihan air (NTU).

- **Output**:
    - `0`: Not Potable (Tidak Layak Minum)
    - `1`: Potable (Layak Minum)

---

## 2. YOLOv8 (Floating Trash Detection)
Model ini mendeteksi keberadaan sampah terapung pada citra permukaan air.

- **Model File**: `water_yolo.pt` (berbasis YOLOv8n)
- **Input**: Citra/Foto (JPG, PNG) - Disarankan resolusi 640x640.
- **Detections**:
    - **Class ID 0**: `floater` (Sampah terapung/material asing di permukaan air).

- **Output**:
    - Bounding Box (koordinat deteksi).
    - Confidence Score (0.0 - 1.0).

---

## 3. Integrasi ke FastAPI

Struktur folder pada server side (`/server`):
```text
server/
├── app/
│   ├── api/             # Router FastAPI
│   └── services/        # Logika Bisnis (Orchestrator)
└── ml/
    ├── saved_models/    # TEMPAT MENYIMPAN FILE .pkl & .pt
    ├── rf_classifier.py # Wrapper Random Forest
    └── yolo_detector.py # Wrapper YOLOv8
```

### Langkah Integrasi:
1.  **Pindahkan Model**:
    Pindahkan `random_forest_model.pkl`, `scaler.pkl`, dan `yolov8n.pt` ke folder `server/ml/saved_models/`.
    *Ubah nama `yolov8n.pt` menjadi `water_yolo.pt` atau sesuaikan path di kode.*

2.  **Update Wrapper**:
    Sesuaikan `server/ml/rf_classifier.py` untuk menggunakan 9 fitur di atas dan memuat `scaler.pkl` sebelum melakukan prediksi.

3.  **Update Services**:
    Gunakan `app/services/ml_service.py` untuk memanggil kedua wrapper tersebut dan menggabungkan hasilnya (Fusion logic).
