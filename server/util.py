import pickle
import pandas as pd

model = None

# Load the trained model and other necessary data
def load_saved_artifacts():
    print("Loading saved artifacts...!")
    global model
    with open("./artifacts/ElectricityBill_Model.pickle",'rb') as f:
        model = pickle.load(f)
    print("Loading saved artifacts...DONE")

# Prediction logic
def predict_price(num_rooms, num_people, is_ac, is_tv, num_children, is_urban):
    new_df = pd.DataFrame({
        "num_rooms": [num_rooms],
        "num_people": [num_people],
        "is_ac": [is_ac],
        "is_tv": [is_tv],
        "num_children": [num_children],
        "is_urban": [is_urban]
    })
    prediction = model.predict(new_df)
    return round(prediction[0],2)

if __name__ == "__main__":
    load_saved_artifacts()