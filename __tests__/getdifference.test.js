import { test, expect } from '@jest/globals';
import { createRequire } from 'module';
import getDifference from '../src/getdifference.js';

const require = createRequire(import.meta.url, '..');
const filepath1 = require.resolve('../__fixtures__/flatEqual1.json');
const filepath2 = require.resolve('../__fixtures__/flatEqual2.json');

const expectedValue = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('reverse', () => {
  expect(getDifference(filepath1, filepath2)).toEqual(expectedValue);
  // expect(getDifference).toEqual('');
});
