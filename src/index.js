import applyFormatter from './formatters/apply-formatter.js';
import getDiffTree from './getDifTree.js';

const getDiff = (filePath1, filePath2, format = 'stylish') => {
  const resultFileForFormat = getDiffTree(filePath1, filePath2);
  const result = applyFormatter(resultFileForFormat, format);
  return result;
};

export default getDiff;
