# Skybrief CLI

Skybrief is a minimalist command-line weather app that shows the current conditions for a saved city. It uses the [OpenWeather API](https://openweathermap.org/api) and presents the result as a compact, colorized terminal forecast.

The forecast includes:

- Weather description and an icon
- Current and “feels like” temperatures in Celsius
- Humidity
- Wind speed

## Requirements

- [Node.js](https://nodejs.org/) 22 or newer
- An [OpenWeather API key](https://home.openweathermap.org/api_keys)

## Installation

Install Skybrief globally from npm:

```sh
npm install --global skybrief-cli
```

This makes the `skybrief` command available in your terminal.

You can also run it without a global installation:

```sh
npx skybrief-cli
```

## Setup

Save your OpenWeather API key:

```sh
skybrief -t YOUR_API_KEY
```

Save the city whose weather you want to check:

```sh
skybrief -s "Tallinn"
```

City names may include a country code when disambiguation is needed:

```sh
skybrief -s "Tallinn,EE"
```

The API key and city are stored in `~/weather-data.json` so they remain available between runs. The API key is stored as plain text; do not share this file.

## Usage

Show the current weather for the saved city:

```sh
skybrief
```

Available options:

```text
skybrief              Show the current weather
skybrief -s CITY      Save or change the city
skybrief -t API_KEY   Save or change the OpenWeather API key
skybrief -h           Show help
```

Values can also be supplied through environment variables. Environment variables take precedence over saved settings:

```sh
TOKEN=YOUR_API_KEY CITY="Helsinki,FI" skybrief
```

This is useful for temporary queries, scripts, and CI environments where you do not want to write a local configuration file.

## Local development

Clone the repository and install its dependencies:

```sh
git clone https://github.com/anton-kiilo/skybrief-cli.git
cd skybrief-cli
npm install
```

Run the app directly:

```sh
TOKEN=YOUR_API_KEY CITY="Tallinn,EE" npm start
```

Or link the package locally to test the `skybrief` command:

```sh
npm link
skybrief -t YOUR_API_KEY
skybrief -s "Tallinn,EE"
skybrief
```

## How it works

Skybrief requests current weather data from OpenWeather using metric units and English descriptions. Saved settings are read from the user's home directory, while the `TOKEN` and `CITY` environment variables can override them for an individual run. Common API errors, such as an invalid city or API key, are displayed as terminal-friendly error messages.

## License

[ISC](https://opensource.org/license/isc-license-txt)
