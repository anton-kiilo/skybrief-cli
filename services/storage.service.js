import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { printError, printSuccess } from './log.service.js';

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
}

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) => {
	let data = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}

	data[key] = value;

	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key];
	}

	return undefined;
};

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch {
		return false;
	}
};

const saveToken = async (token) => {
	if (!token.length) {
		printError('No token provided');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (error) {
		printError(error.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('No city provided');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	} catch (error) {
		printError(error.message);
	}
}

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city);

		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('Invalid city');
		} else if (error?.response?.status == 401) {
			printError('Invalid token');
		} else {
			printError(error.message);
		}
	}
}

export { getKeyValue, saveKeyValue, saveToken, saveCity, getForecast, TOKEN_DICTIONARY };
