# Cop and Fugitive Simulation API

This is a Node.js application built using Express that simulates a scenario where cops chase a fugitive hiding in one of several cities. The cops can choose from different electric vehicles to chase the fugitive, and the application determines whether the fugitive is captured.

## Features

- Retrieve a list of cities.
- Retrieve a list of available vehicles.
- Start a simulation where cops choose vehicles and randomly get assigned to cities to capture the fugitive.
- Get the result of the simulation to check if the fugitive is captured.

## Requirements

- Node.js (version 12 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:
    ```bash
    https://github.com/diksha032008/YocketBE.git
    cd YocketBE
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```

2. The server will run on port 3000 by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

### Get List of Cities

- **Endpoint**: `/cities`
- **Method**: GET
- **Response**: JSON array of cities

    ```json
    [
        { "name": "Yapkashnagar", "distance": 60 },
        { "name": "Lihaspur", "distance": 50 },
        { "name": "Narmis City", "distance": 40 },
        { "name": "Shekharvati", "distance": 30 },
        { "name": "Nuravgram", "distance": 20 }
    ]
    ```

### Get List of Vehicles

- **Endpoint**: `/vehicles`
- **Method**: GET
- **Response**: JSON array of vehicles

    ```json
    [
        { "name": "EV Bike", "range": 60, "count": 2 },
        { "name": "EV Car", "range": 100, "count": 1 },
        { "name": "EV SUV", "range": 120, "count": 1 }
    ]
    ```

### Start Simulation

- **Endpoint**: `/api/start-simulation`
- **Method**: POST
- **Request Body**: JSON object containing the vehicles selected by the cops

    ```json
    {
        "vehicles": {
            "cop1": "EV Bike",
            "cop2": "EV Car"
        }
    }
    ```

- **Response**: JSON object with the result of the simulation

    ```json
    {
        "success": true,
        "capturingCop": "Cop1",
        "city": { "name": "Nuravgram", "distance": 20 }
    }
    ```

    or

    ```json
    {
        "success": false
    }
    ```

### Get Simulation Result

- **Endpoint**: `/result`
- **Method**: GET
- **Response**: JSON object with the result of the simulation

    ```json
    {
        "success": true,
        "capturingCop": "Cop1"
    }
    ```

    or

    ```json
    {
        "success": false
    }
    ```

## Endpoint Curl Requests

### Using curl

#### Get List of Cities
```bash
curl -X GET http://localhost:3000/cities
```

#### Get List of Vehicles
```bash
curl -X GET http://localhost:3000/vehicles
```

#### Start Simulation
```bash
curl -X POST http://localhost:3000/api/start-simulation -H "Content-Type: application/json" -d '{"vehicles": {"cop1": "EV Bike", "cop2": "EV Car"}}'
```

#### Get Simulation Result
```bash
curl -X GET http://localhost:3000/result
```

