from flask import Flask, Response
from flask_cors import CORS, cross_origin

from forecastAPI import request

app = Flask(__name__)
CORS(app, support_credentials=True)

@cross_origin(origins="http://localhost:1234")
@app.route('/forecast/<lat>,<lng>')
def get_forecast_by_coord(lat: float, lng: float):
    response_data = request.forecast_request(lat, lng)
    return Response(response_data, content_type='application/json')