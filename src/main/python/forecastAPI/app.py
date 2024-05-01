from flask import Flask, Response

from forecastAPI import request

app = Flask(__name__)

@app.route('/forecast/<lat>,<lng>')
def get_forecast_by_coord(lat: float, lng: float):
    response_data = request.forecast_request(lat, lng)
    return Response(response_data, content_type='application/json')