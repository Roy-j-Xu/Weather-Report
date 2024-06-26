#!/bin/bash

setup() {
    echo --- Setting up project ---

    echo --- Installing Maven dependencies ---
    ./mvnw clean install

    echo --- Creating Python virtual environment ---
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

    echo --- Installing Node.js dependencies ---
    npm install

    echo --- Project setup completed ---
}

run() {
    echo --- Starting main API ---
    ./mvnw spring-boot:run &

    echo --- Starting ForecastAPI ---
    source venv/bin/activate
    flask --app 'src\main\python\forecastAPI\app' run
}

test() {
    echo --- Testing main API ---
    mvn test

    echo --- Testing ForecastAPI ---
    python -m unittest discover -s './src/test/python/'
}

if [[ "$1" == "setup" ]]; then
    setup
elif [[ "$1" == "test" ]]; then
    test
elif [[ "$1" == "run" ]]; then
    run
fi