#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';
import getDifference from '../getdifference.js';

const require = createRequire(import.meta.url);
const packageConfig = require('../../package.json');

const { program } = commander.program;
/*
const fs = require('fs');
const path = require('path');

const path1 = path.resolve('file1.json');
const path11 = process.cwd(path1);
console.log(path11);
console.log(path1);
const filee1 = fs.readFileSync('/home/alex/frontend-project-lvl2/src/file1.json', 'utf8');
console.log(filee1);
*/

program
  .version(`${packageConfig.version}`)
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> </filepath2>')
  .action((filepath1, filepath2) => {
    // const fs = require('fs');
    // const path = require('path');
    // const path1 = process.cwd(filepath1);
    // console.log(path.resolve(filepath1));
    // const file1 = fs.readFileSinc(path.resolve(filepath1), 'utf8');
    // const file2 = fs.readFileSinc('filepath2');
    // console.log(file1);
    getDifference(filepath1, filepath2);
  });

program.parse(process.argv);
