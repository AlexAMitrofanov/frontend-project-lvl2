import _ from 'lodash';

const getDifference = (file1, file2) => {
  // const fil1 = fs.readFileSinc(file1);

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
  const result = entriesOfRO.reduce((acc, [key, value]) => acc.concat(`\n${key}: ${value} `), '');
  console.log(`{ ${result} \n}`);
};

export default getDifference;
