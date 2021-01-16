#!/usr/bin/env node

import commander from 'commander';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageConfig = require('../../package.json');

const { program } = commander.program;

program.version(`${packageConfig.version}`);

program.description('Compares two configuration files and shows a difference');

program.parse(process.argv);
