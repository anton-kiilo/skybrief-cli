#!/usr/bin/env node
import { parseArguments } from './helpers/arguments.js';
import { saveToken, saveCity, getForecast } from './services/storage.service.js';
import { printHelp } from './services/log.service.js';

const initCLI = () => {
  const args = parseArguments(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};

initCLI();