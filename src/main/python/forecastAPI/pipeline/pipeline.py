import pandas as pd

def _process_point_metadata(json: dict) -> dict:
    """
    Processes JSON metadata received from endpoint /points/{point}.

    Args:
        json: JSON metadata received from end point /points/{point}

    Returns: 
        A dictionary of API endpoints that provide weather information
        of the given point, with the following keys:
            - 'forecast' (str): API endpoint for forecast.
            - 'forecastHourly' (str): API endpoint for hourly forecast.
            - 'forecastGridData' (str): API endpoint for raw weather data.
    """
    meta = {}
    meta['forecast'] = json['properties']['forecast']
    meta['forecastHourly'] = json['properties']['forecastHourly']
    meta['forecastGridData'] = json['properties']['forecastGridData']
    return meta

def forecast_pipeline(json: dict):
    '''Process forecast data'''
    raw_data = json['properties']
    df = pd.DataFrame(raw_data)
    return df