import requests
import json
from flask import jsonify

from forecastAPI import pipeline

API = "https://api.weather.gov"

def _point_meta_request(lat: float, lng: float) -> dict:
    """A helper function for retrieving metadata about a given point.
    """
    url = f"{API}/points/{lat},{lng}"
    point_request = requests.get(url)

    if point_request.status_code == 404:
        raise requests.RequestException('Data unavailable for requested point.')

    return pipeline._process_point_metadata(point_request.json())


def forecast_request(lat: float, lng: float, data_type:str='forecast') -> dict:
    '''Retrieve weather data about a given point.

    Args:
        lat (float): Latitude
        lng (float): Longitude
        data_type (str): Type of data, can be either 'forecast', 'forecastHourly' 
            or 'forecastGridData'.

    Returns:
        data (DataFrame): Processed data of requested type.
    '''
    url = _point_meta_request(lat, lng)[data_type]

    if url is None:
        raise requests.RequestException('Data unavailable for requested point.')

    w_request = requests.get(url)
    if w_request.status_code == 404:
        raise requests.RequestException('Data unavailable for requested point.')

    data = pipeline.forecast_pipeline(w_request.json()).to_json()

    return data