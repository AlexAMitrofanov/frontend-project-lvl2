import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import getDifference from '../src/getdifference.js';

const require = createRequire(import.meta.url, '..');
const filepath1 = require.resolve('../__fixtures__/flatEqual1.json');
const filepath2 = require.resolve('../__fixtures__/flatEqual2.json');
const filepath3 = require.resolve('../__fixtures__/file1.yml');
const filepath4 = require.resolve('../__fixtures__/file2.yml');

const expectedValue = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getDifference', () => {
  expect(getDifference(filepath1, filepath2)).toEqual(expectedValue);
  expect(getDifference(filepath3, filepath4)).toEqual(expectedValue);
});
