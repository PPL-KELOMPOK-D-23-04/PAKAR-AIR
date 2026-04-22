import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

# Load dataset
dataset_path = 'dataset/quality_water_ML/water_potability.csv'
if not os.path.exists(dataset_path):
    print(f"Error: {dataset_path} not found.")
    exit()

df = pd.read_csv(dataset_path)

# Fill missing values with mean (as done in notebook)
df.fillna(df.mean(), inplace=True)

# Split features and target
X = df.drop(["Potability"], axis=1)
y = df["Potability"]

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train Random Forest model (same params as notebook)
model = RandomForestClassifier(
    n_estimators=150,
    max_depth=10,
    random_state=42
)
model.fit(X_train_scaled, y_train)

# Save the model and scaler to .pkl files
with open('random_forest_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print("Model and Scaler have been saved successfully as .pkl files!")
