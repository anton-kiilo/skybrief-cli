#!/usr/bin/env node
import { parseArguments } from './helpers/arguments.js';

const initCLI = () => {
  const args = parseArguments(process.argv);

  if (args.h) {
    console.log('Get help');
  }
  if (args.s) {
    console.log('Save location');
  }
  if (args.t) {
    console.log('Add token');
  }
};

initCLI();