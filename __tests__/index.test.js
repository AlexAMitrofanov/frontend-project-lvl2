import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import getDiff from '../src/index.js';
import expectedValueFlat from '../__fixtures__/flatFileResult.js';
import expectedValueTree from '../__fixtures__/treeFileResult.js';
import expectedValuePlain from '../__fixtures__/plainTreeFileResult.js';

const require = createRequire(import.meta.url);
const dir = '../__fixtures__/';
const filePath = (fileName) => require.resolve(`${dir}`.concat(`${fileName}`));

test('getDifference for flat files', () => {
  expect(getDiff(filePath('flatEqual1.json'), filePath('flatEqual2.json'))).toEqual(expectedValueFlat);
  expect(getDiff(filePath('file1.yml'), filePath('file2.yml'))).toEqual(expectedValueFlat);
});

test('getDifference for brunched structure', () => {
  expect(getDiff(filePath('fileTree1.json'), filePath('fileTree2.json'))).toEqual(expectedValueTree);
  expect(getDiff(filePath('fileTree1.yml'), filePath('fileTree2.yml'))).toEqual(expectedValueTree);
});

test('getDifference for brunched structure with plain formatter', () => {
  expect(getDiff(filePath('fileTree1.json'), filePath('fileTree2.json'), 'plain')).toEqual(expectedValuePlain);
  expect(getDiff(filePath('fileTree1.yml'), filePath('fileTree2.yml'), 'plain')).toEqual(expectedValuePlain);
});
