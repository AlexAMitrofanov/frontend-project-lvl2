#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageConfig = require('../../package.json');

const { program } = commander.program;

program
  .version(`${packageConfig.version}`)
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> </filepath2>');

program.parse(process.argv);
