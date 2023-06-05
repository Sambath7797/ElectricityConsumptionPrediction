from flask import Flask, render_template, request
import util
from flask import jsonify


app = Flask(__name__)



# Route for the home page
@app.route('/')
def home():
    return render_template("app.html")

# Route for handling the prediction request
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    num_rooms = int(data['num_rooms'])
    num_people = int(data['num_people'])
    is_ac = data['is_ac']
    is_tv = data['is_tv']
    num_children = int(data['num_children'])
    is_urban = data['is_urban']

    # Perform the prediction using the model
    estimated_price = util.predict_price(num_rooms, num_people, is_ac, is_tv, num_children, is_urban)

    # Create a response JSON object
    response = {
        "estimated_price": estimated_price
    }

    return jsonify(response)



if __name__ == '__main__':
    util.load_saved_artifacts()
    app.run(debug="True")
