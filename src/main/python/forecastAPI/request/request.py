import requests

import pipeline

API = "https://api.weather.gov"

def _point_meta_request(lat: float, lng: float) -> dict:
    """A helper function for retrieving metadata about a given point.
    """
    url = f"{API}/points/{lat},{lng}"
    point_request = requests.get(url)

    if point_request.status_code == 404:
        raise requests.RequestException('Data Unavailable For Requested Point')

    return pipeline._process_point_metadata(point_request.json())

def weather_request(lat: float, lng: float, data:str='forecast') -> dict:
    '''Retrieve weather data about a given point.

    Args:
        lat (float): Latitude
        lng (float): Longitude
        data (str): Type of data, can be either 'forecast', 'forecastHourly' 
            or 'forecastGridData'.
    '''
    url = _point_meta_request(lat, lng)[data]
    w_request = requests.get(url)
    return w_request.json()