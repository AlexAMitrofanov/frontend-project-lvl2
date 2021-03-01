import fs from 'fs';
import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import getDiff from '../src/index.js';

const require = createRequire(import.meta.url);
const dir = '../__fixtures__/';
const filePath = (fileName) => require.resolve(`${dir}`.concat(`${fileName}`));
const expValue = (fileName) => fs.readFileSync(filePath(fileName), 'utf-8');

const allCases = [
  [filePath('fileTree1.json'), filePath('fileTree2.json')],
  [filePath('fileTree1.json'), filePath('fileTree2.yml')],
  [filePath('fileTree1.yml'), filePath('fileTree2.yml')],
];

test.each(allCases)('getDifference for brunched structure default formatter and stylish formatter', (firstFile, secondFile) => {
  expect(getDiff(firstFile, secondFile)).toEqual(expValue('result-stylish.txt'));
  expect(getDiff(firstFile, secondFile, 'stylish')).toEqual(expValue('result-stylish.txt'));
});

test.each(allCases)('getDifference for brunched structure with plain formatter', (firstFile, secondFile) => {
  expect(getDiff(firstFile, secondFile, 'plain')).toEqual(expValue('result-plain.txt'));
});

test.each(allCases)('getDifference for brunched structure with JSON style formatter', (firstFile, secondFile) => {
  expect(getDiff(firstFile, secondFile, 'json')).toEqual(expValue('result-json.txt'));
});
