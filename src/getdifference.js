import _ from 'lodash';
import { createRequire } from 'module';

const getDifference = (filepath1, filepath2) => {
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const path = require('path');
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);
  const fileContent1 = fs.readFileSync(path1, 'utf8');
  const fileContent2 = fs.readFileSync(path2, 'utf8');
  const file1 = JSON.parse(fileContent1);
  const file2 = JSON.parse(fileContent2);
  const keys1 = Object.keys(file1).sort();
  const keys2 = Object.keys(file2).sort();
  const keys = keys2.reduce((acc, key) => {
    if (!acc.includes(key)) {
      acc.push(key);
    }
    return acc;
  }, keys1).sort();
  const resultObject = keys.reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file2[key] === file1[key]) {
        acc[`    ${key}`] = file2[key];
      }
      if (file2[key] !== file1[key]) {
        acc[`  - ${key}`] = file1[key];
        acc[`  + ${key}`] = file2[key];
      }
      return acc;
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      acc[`  - ${key}`] = file1[key];
      return acc;
    }
    acc[`  + ${key}`] = file2[key];
    return acc;
  }, {});
  const entriesOfRO = Object.entries(resultObject);
  const result = entriesOfRO.reduce((acc, [key, value]) => acc.concat(`\n${key}: ${value}`), '');
  const res = `{${result}\n}`;
  return res;
};

export default getDifference;
