import _ from 'lodash';
import parseFile from './parse-file.js';

const iter = (file1, file2) => {
  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
  const result = keys.reduce((acc, key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file2[key] === file1[key]) {
        return acc.concat({ key, status: 'unchanged', value: file2[key] });
      }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return acc.concat({ key, status: 'unchanged', value: iter(file1[key], file2[key]) });
      }
      return acc.concat({
        key, status: 'changed', valueOld: file1[key], valueNew: file2[key],
      });
    }
    if (!_.has(file1, key)) {
      return acc.concat({ key, status: 'added', value: file2[key] });
    }
    return acc.concat({ key, status: 'removed', value: file1[key] });
  }, []);
  return result;
};

const getDiffTree = (filePath1, filePath2) => {
  const parsedFile1 = parseFile(filePath1);
  const parsedFile2 = parseFile(filePath2);
  return iter(parsedFile1, parsedFile2);
};
export default getDiffTree;
