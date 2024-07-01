# Forecast API

A data pipeline built with Flask, cleaning raw data retrieved from National Weather Service (NWS) API. It also serves as a facade for NWS API.

This component is currently a simple assembly of pure functions, following no particular architecture.

## Specification

Once the component is running, the API endpoint will be located at `http://localhost:5000`

- Get forecast data: `/forecast/{lat},{lng}`.

  > An example of response can be found at `src/test/python/forecastAPI_test/pipeline_test/test_data.json`