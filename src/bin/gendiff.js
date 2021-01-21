#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';
import getDifference from '../getdifference.js';

const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const packageConfig = require('../../package.json');

const { program } = commander.program;

program
  .version(`${packageConfig.version}`)
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> </filepath2>')
  .action((filepath1, filepath2) => {
    const path1 = path.resolve(filepath1);
    const path2 = path.resolve(filepath2);
    const fileContent1 = fs.readFileSync(path1, 'utf8');
    const fileContent2 = fs.readFileSync(path2, 'utf8');
    getDifference(fileContent1, fileContent2);
  });

program.parse(process.argv);
