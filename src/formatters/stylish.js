import _ from 'lodash';

const stylishSimplObj = (obj, indent) => {
  const indStep = '    ';
  const newInd = `${indStep}${indent}`;
  const keys = Object.keys(obj);
  const res = keys.reduce((acc, key) => ((obj[key] !== Object(obj[key])) ? acc.concat(`\n${newInd}${key}: ${obj[key]}`) : acc.concat(`\n${newInd}${key}: {${stylishSimplObj(obj[key], `${newInd}`)}\n${newInd}}`)), '');
  return res;
};

const getNewValue = (value, indent, func) => ((!_.isObject(value)) ? `${value}` : `{${func(value, `${indent}`)}\n${indent}}`);

const getSign = (data) => ((data === 'added') ? '+' : '-');

const iter = (tree, indent) => {
  const indStep = '    ';
  const indSmall = `${indStep.slice(2)}${indent}`;
  const indBig = `${indStep}${indent}`;
  const result = tree.reduce((acc, elem) => {
    const { key, status, value } = elem;
    if (status === 'unchanged') {
      return acc.concat(`\n${indBig}${key}: ${getNewValue(value, indBig, iter)}`);
    }
    if (status === 'changed') {
      const changedOld = elem.valueOld;
      const changedNew = elem.valueNew;
      return acc.concat(`\n${indSmall}- ${key}: ${getNewValue(changedOld, indBig, stylishSimplObj)}\n${indSmall}+ ${key}: ${getNewValue(changedNew, indBig, stylishSimplObj)}`);
    }
    return acc.concat(`\n${indSmall}${getSign(status)} ${key}: ${getNewValue(value, indBig, stylishSimplObj)}`);
  }, []);
  return result;
};

const stylish = (file) => {
  const result = iter(file, '');
  return `{${result.join('')
    .split(',')
    .join('')}\n}`;
};

export default stylish;
