import _ from 'lodash';

const getNewValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return ((typeof value === 'string') ? `'${value}'` : value);
};

const iter = (file, dir1) => {
  const result = file.reduce((acc, elem) => {
    const { key, status, value } = elem;
    const dir = `${dir1}.${key}`;
    switch (status) {
      case 'added':
        return `${acc}${dir}' was added with value: ${getNewValue(value)}*`;
      case 'removed':
        return `${acc}${dir}' was removed*`;
      case 'changed':
        return `${acc}${dir}' was updated. From ${getNewValue(elem.valueOld)} to ${getNewValue(elem.valueNew)}*`;
      case 'unchanged':
        return (_.isObject(value)) ? `${acc}${iter(value, dir)}` : `${acc}`;
      default:
        throw new Error(`${status} is unknown!`);
    }
  }, '');
  return result;
};

const makePlainView = (tree) => iter(tree, '')
  .split('*').filter((el) => el)
  .map((el) => `Property '${el.slice(1)}`)
  .join('\n');

export default makePlainView;
