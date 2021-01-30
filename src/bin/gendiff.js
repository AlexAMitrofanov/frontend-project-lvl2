#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';
import getDiff from '../index.js';

const require = createRequire(import.meta.url);
const packageConfig = require('../../package.json');

const { program } = commander.program;

program
  .version(`${packageConfig.version}`)
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> </filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
