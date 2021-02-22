const makePlainView = (tree) => {
  const iter = (file, dir1) => {
    const result = file.reduce((acc, elem) => {
      const dir = `${dir1}.${elem.key}`;
      const value = (typeof elem.value === 'string') ? `'${elem.value}'` : elem.value;
      if (elem.status === 'added') {
        return value !== Object(value) ? `${acc}${dir}' was added with value: ${value}\n`
          : `${acc}${dir}' was added with value: [complex value]\n`;
      }
      if (elem.status === 'removed') {
        return `${acc}${dir}' was removed\n`;
      }
      if (elem.status === 'changed') {
        const value1 = (typeof elem.value1 === 'string') ? `'${elem.value1}'` : elem.value1;
        const value2 = (typeof elem.value2 === 'string') ? `'${elem.value2}'` : elem.value2;
        if (value1 !== Object(value1) && value2 !== Object(value2)) {
          return `${acc}${dir}' was updated. From ${value1} to ${value2}\n`;
        }
        return (value1 === Object(value1)) ? `${acc}${dir}' was updated. From [complex value] to ${value2}\n`
          : `${acc}${dir}' was updated. From ${value1} to [complex value]\n`;
      }
      return (value === Object(value)) ? `${acc}${iter(value, dir)}` : `${acc}`;
    }, '');
    return result;
  };
  return iter(tree, '')
    .split('\n').filter((el) => el)
    .map((el) => `Property '${el.slice(1)}`)
    .join('\n');
};

export default makePlainView;
