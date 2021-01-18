#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';
import getDifference from '../getdifference.js';

const require = createRequire(import.meta.url);
const packageConfig = require('../../package.json');

const { program } = commander.program;

program
  .version(`${packageConfig.version}`)
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> </filepath2>');

program.parse(process.argv);

const arg1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const arg2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

getDifference(arg1, arg2);
