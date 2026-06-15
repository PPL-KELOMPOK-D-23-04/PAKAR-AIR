# Model Specification & Input Requirements

Dokumentasi ini menjelaskan spesifikasi input dan output untuk model Machine Learning (Random Forest) dan Deep Learning (YOLOv8) yang digunakan dalam proyek PAKAR-AIR.

**Last Updated:** 11 Juni 2026

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
    - `0`: Not Potable (Tidak Layak Minum) → `tidak_layak`
    - `1`: Potable (Layak Minum) → `layak`
- **Confidence**: `max(predict_proba)`
- **Feature Importance**: Extracted dari `model.feature_importances_`

---

## 2. YOLOv8 (Floating Trash Detection)
Model ini mendeteksi keberadaan sampah terapung pada citra permukaan air.

- **Model File**: `water_yolo.pt` (berbasis YOLOv8n)
- **Input**: Citra/Foto (JPG, PNG, WEBP, BMP) - Di-resize ke max 640×640.
- **Detections**:
    - **Class ID 0**: `floater` (Sampah terapung/material asing di permukaan air).

- **Output**:
    - Bounding Box (koordinat deteksi).
    - Confidence Score (0.0 - 1.0).
- **Scoring**: Jika ada deteksi negatif: `score = 1 - avg_negative_confidence`. Jika tidak ada deteksi: `score = 0.5` (neutral).

---

## 3. Fusion Layer

Menggabungkan hasil DL dan ML menjadi keputusan final.

- **Formula**: `Final Score = DL_score × 0.4 + ML_score × 0.6`
- **DL Weight**: 0.4 (40%)
- **ML Weight**: 0.6 (60%)
- **Threshold**: `score > 0.5` → **LAYAK**, `score ≤ 0.5` → **TIDAK LAYAK**
- **Explanation**: Dihasilkan dalam format bullet-point (`•`) per tahap (DL, ML, Kesimpulan)
- **Recommendation**: Teks rekomendasi tindak lanjut berdasarkan kategori hasil

---

## 4. Integrasi ke FastAPI

Struktur folder pada server side (`/server`):
```text
server/
├── app/
│   ├── api/             # Router FastAPI
│   └── services/        # Logika Bisnis (Orchestrator)
│       └── ml_service.py # Wrapper ML/DL inference
└── ML_DL/
    ├── saved_models/    # TEMPAT MENYIMPAN FILE .pkl & .pt
    │   ├── random_forest_model.pkl
    │   ├── scaler.pkl
    │   └── water_yolo.pt
    ├── rf_classifier.py # Wrapper Random Forest
    ├── yolo_detector.py # Wrapper YOLOv8
    ├── fusion.py        # Fusion layer (DL×0.4 + ML×0.6)
    └── preprocessor.py  # Image/data validation & preprocessing
```

### Langkah Integrasi:
1.  **Pastikan Model Files**: `random_forest_model.pkl`, `scaler.pkl`, dan `water_yolo.pt` ada di folder `server/ML_DL/saved_models/`.

2.  **Pipeline Flow**:
    - `analysis_service.py` → `ml_service.run_full_inference(image_path, manual_data)`
    - `ml_service.py` → calls `yolo_detector.predict_image()` + `rf_classifier.predict_manual()` + `fusion.fuse_results()`

3.  **Null Handling**:
    - Jika model file tidak ditemukan, menggunakan placeholder result (score 0.5, neutral).
    - Jika salah satu model null, fusion menggunakan score 0.5 (neutral) untuk model yang missing.
