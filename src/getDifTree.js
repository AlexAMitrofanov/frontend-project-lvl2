import _ from 'lodash';
import parseFile from './parse-file.js';

const getDiffTree = (filePath1, filePath2) => {
  const parsedFile1 = parseFile(filePath1);
  const parsedFile2 = parseFile(filePath2);
  const iter = (file1, file2) => {
    const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
    const resultObject = keys.reduce((acc, key) => {
      const acc1 = _.cloneDeep(acc);
      if (_.has(file1, key) && _.has(file2, key)) {
        if (file2[key] === file1[key]) {
          Object.assign(acc, { [`  ${key}`]: file2[key] });
          return Object.assign(acc1, { [`  ${key}`]: file2[key] });
        }
        if ((typeof file1[key] === 'object') && (typeof file2[key] === 'object')) {
          return Object.assign(acc1, { [`  ${key}`]: iter(file1[key], file2[key]) });
        }
        return Object.assign(acc1, { [`8 ${key}`]: [file1[key], file2[key]] });
      }
      if (!_.has(file1, key) && _.has(file2, key)) {
        return Object.assign(acc1, { [`+ ${key}`]: file2[key] });
      }
      return Object.assign(acc1, { [`- ${key}`]: file1[key] });
    }, {});
    return resultObject;
  };
  return iter(parsedFile1, parsedFile2);
};
export default getDiffTree;
