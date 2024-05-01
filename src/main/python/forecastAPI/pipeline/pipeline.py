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

def _raw_forcast_dataframe(json) -> pd.DataFrame:
    raw_data = json['properties']['periods']
    normalized = pd.json_normalize(raw_data)
    df = pd.DataFrame(normalized)
    return df

def _parse_time(data: pd.DataFrame, column: str):
    """Parse a column of time data into 2 columns.

    Args:
        data (DataFrame): DataFrame with column to be parsed.
        column (str): The column of time data of format
            {YYYY-MM-DD}T{hh:mm:ss}-{mm:ss}.

    Returns:
        parsed_data (DataFrame): A DataFrame of 2 columns:
            - 'date': YYYY-MM-DD.
            - 'time': hh:mm
    
        For example, '2024-04-30T08:00:00-04:00' will be parsed into:
            - 'date': '2024-04-30'
            - 'time': '08:00'
    """
    parsed_data = pd.DataFrame()
    parsed_data[['date', 'time']] = data['startTime'].str.split('T', expand=True)
    parsed_data['time'] = parsed_data['time'].apply(lambda time: time[:5])
    return parsed_data

def forecast_pipeline(json: dict) -> pd.DataFrame:
    '''Process forecast data.'''
    df = _raw_forcast_dataframe(json)

    # Change Fahrenheit to Celsius
    df['temperature'] = round(5 * (df['temperature'] - 35) / 9)
    df['temperature'] = df['temperature'].astype('int64')

    df[['date', 'time']] = _parse_time(df, 'startTime')

    df.drop(columns=[
        'startTime',
        'endTime',
        'temperatureUnit',
        'probabilityOfPrecipitation.unitCode', 
        'dewpoint.unitCode',
        'relativeHumidity.unitCode',
        'icon'
        ],
        inplace=True)

    df.rename(columns={
        'dewpoint.value': 'dewpoint',
        'relativeHumidity.value': 'relativeHumidity',
        'probabilityOfPrecipitation.value': 'probabilityOfPrecipitation'
    },
    inplace=True)

    return df