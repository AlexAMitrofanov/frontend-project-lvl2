import fs from 'fs';
import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import getDiff from '../src/index.js';

const require = createRequire(import.meta.url);
const dir = '../__fixtures__/';
const filePath = (fileName) => require.resolve(`${dir}`.concat(`${fileName}`));
const expValue = (fileName) => fs.readFileSync(filePath(fileName), 'utf-8');

test('getDifference for brunched structure', () => {
  expect(getDiff(filePath('fileTree1.json'), filePath('fileTree2.json'))).toEqual(expValue('result-stylish.txt'));
  expect(getDiff(filePath('fileTree1.yml'), filePath('fileTree2.yml'))).toEqual(expValue('result-stylish.txt'));
});

test('getDifference for brunched structure with plain formatter', () => {
  expect(getDiff(filePath('fileTree1.json'), filePath('fileTree2.json'), 'plain')).toEqual(expValue('result-plain.txt'));
  expect(getDiff(filePath('fileTree1.yml'), filePath('fileTree2.yml'), 'plain')).toEqual(expValue('result-plain.txt'));
});

test('getDifference for brunched structure with JSON style formatter', () => {
  expect(getDiff(filePath('fileTree1.json'), filePath('fileTree2.json'), 'json')).toEqual(expValue('result-json.txt'));
  expect(getDiff(filePath('fileTree1.yml'), filePath('fileTree2.yml'), 'json')).toEqual(expValue('result-json.txt'));
});
