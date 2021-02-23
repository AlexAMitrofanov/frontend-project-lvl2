import _ from 'lodash';

const getNewValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return ((typeof value === 'string') ? `'${value}'` : value);
};

const iter = (file, dir1) => {
  const result = file.reduce((acc, elem) => {
    const dirName = elem.key;
    const dir = `${dir1}.${dirName}`;
    const value = getNewValue(elem.value);
    if (elem.status === 'added') {
      return `${acc}${dir}' was added with value: ${value}\n`;
    }
    if (elem.status === 'removed') {
      return `${acc}${dir}' was removed\n`;
    }
    if (elem.status === 'changed') {
      const valueOld = getNewValue(elem.valueOld);
      const valueNew = getNewValue(elem.valueNew);
      return `${acc}${dir}' was updated. From ${valueOld} to ${valueNew}\n`;
    }
    const valueUnchanged = elem.value;
    return (_.isObject(valueUnchanged)) ? `${acc}${iter(valueUnchanged, dir)}` : `${acc}`;
  }, '');
  return result;
};

const makePlainView = (tree) => iter(tree, '')
  .split('\n').filter((el) => el)
  .map((el) => `Property '${el.slice(1)}`)
  .join('\n');

export default makePlainView;
