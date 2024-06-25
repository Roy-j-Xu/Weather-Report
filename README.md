# Weather Report

## Overview

Weather Report is an API-driven web application that provides weather forecast data for American cities.

## Usage

*To be completed*

## Documentation

### Architecture

The following diagram shows the overall structure of this project. 

![main structure](docs/diagrams/main_structure.png)

### Components

- [**Main API**](docs/mainApi.md): A Rest-API created with Spring Boot. It handles searching and user-specific functionalities.
- [**Database**](docs/database.md): PostgreSQL database storing geographical data of cities and user information.
- [**Data Pipeline**](docs/dataPipeline.md): A Rest-API created with Flask. It aggregates and transforms external data, also serves as a facade for [external weather API](https://www.weather.gov/documentation/services-web-api).
- [**Frontend**](docs/frontend.md): Developed with (mostly) vanilla Typescript. 

## External links

- All forecast data are provided by [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- All diagrams are created with [drawio-desktop](https://github.com/jgraph/drawio-desktop). 