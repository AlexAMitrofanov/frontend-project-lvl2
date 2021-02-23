import _ from 'lodash';

const iter = (file, dir1) => {
  const result = file.reduce((acc, elem) => {
    const dir = `${dir1}.${elem.key}`;
    const value = (typeof elem.value === 'string') ? `'${elem.value}'` : elem.value;
    if (elem.status === 'added') {
      return (!_.isObject(value)) ? `${acc}${dir}' was added with value: ${value}\n`
        : `${acc}${dir}' was added with value: [complex value]\n`;
    }
    if (elem.status === 'removed') {
      return `${acc}${dir}' was removed\n`;
    }
    if (elem.status === 'changed') {
      const valueOld = (typeof elem.valueOld === 'string') ? `'${elem.valueOld}'` : elem.valueOld;
      const valueNew = (typeof elem.valueNew === 'string') ? `'${elem.valueNew}'` : elem.valueNew;
      if (!_.isObject(valueOld) && !_.isObject(valueNew)) {
        return `${acc}${dir}' was updated. From ${valueOld} to ${valueNew}\n`;
      }
      return (_.isObject(valueOld)) ? `${acc}${dir}' was updated. From [complex value] to ${valueNew}\n`
        : `${acc}${dir}' was updated. From ${valueOld} to [complex value]\n`;
    }
    return (_.isObject(value)) ? `${acc}${iter(value, dir)}` : `${acc}`;
  }, '');
  return result;
};

const makePlainView = (tree) => iter(tree, '')
  .split('\n').filter((el) => el)
  .map((el) => `Property '${el.slice(1)}`)
  .join('\n');

export default makePlainView;
