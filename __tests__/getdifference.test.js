import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import makeRequiredView from '../src/stylish.js';
import expectedValueFlat from '../__fixtures__/flatFileResult.js';
import expectedValueTree from '../__fixtures__/treeFileResult.js';

const require = createRequire(import.meta.url);
const dir = '../__fixtures__/';
const filePath = (fileName) => require.resolve(`${dir}`.concat(`${fileName}`));

test('getDifference for flat files', () => {
  expect(makeRequiredView(filePath('flatEqual1.json'), filePath('flatEqual2.json'))).toEqual(expectedValueFlat);
  expect(makeRequiredView(filePath('file1.yml'), filePath('file2.yml'))).toEqual(expectedValueFlat);
});

test('getDifference for brunched structure', () => {
  expect(makeRequiredView(filePath('fileTree1.json'), filePath('fileTree2.json'))).toEqual(expectedValueTree);
  expect(makeRequiredView(filePath('fileTree1.yml'), filePath('fileTree2.yml'))).toEqual(expectedValueTree);
});
