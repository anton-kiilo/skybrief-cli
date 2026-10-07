import chalk from 'chalk';
import dedent from 'dedent';

const printSuccess = (message) => {
	console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan('HELP')}
		No parameters - weather output
		-s - [CITY] input city
		-h - help
		-t - [API_KEY] save API key
		`
	);
};

const printWeather = (result, icon) => {
	console.log(
		dedent`${chalk.bgYellow('WEATHER')} Weather forecast for ${result.name}
		${icon} ${result.weather[0].description}
		Temperature: ${chalk.blue(Math.round(result.main.temp) + '°C')} (feels like ${chalk.blue(Math.round(result.main.feels_like) + '°C')})
		Humidity: ${chalk.blue(result.main.humidity + '%')}
		Wind speed: ${chalk.blue(result.wind.speed + 'm/s')}
		`
	);
};

const printError = (error) => {
	console.log(`${chalk.bgRed('ERROR')} ${error}`);
};

export { printError, printSuccess, printHelp, printWeather };
