const makePlainView = (tree) => {
  const iter = (file, dir1) => {
    const keys = Object.keys(file);
    const result = keys.reduce((acc, key) => {
      const dir = dir1 === '' ? `${key.slice(2)}` : `${dir1}.${key.slice(2)}`;
      const signs = ['+', '-', '8'];
      const hasSign = signs.filter((sign) => key.includes(sign))[0];
      let acc1;
      const value = (typeof file[key] === 'string') ? `'${file[key]}'` : file[key];
      let value1;
      let value2;
      if (Array.isArray(file[key])) {
        [value1, value2] = file[key];
        value1 = (typeof value1 === 'string') ? `'${value1}'` : value1;
        value2 = (typeof value2 === 'string') ? `'${value2}'` : value2;
        if (value1 === Object(value1)) {
          value1 = '[complex value]';
        }
        if (value2 === Object(value2)) {
          value2 = '[complex value]';
        }
      }

      if (!hasSign) {
        if (value !== Object(value)) {
          acc1 = `${acc}`;
          return acc1;
        }
        if (value === Object(value)) {
          acc1 = `${acc}${iter(value, dir)}`;
          return acc1;
        }
      }

      if (hasSign) {
        if (hasSign === '-') {
          acc1 = `${acc}${dir}' was removed\n`;
        }
        if (hasSign === '+') {
          acc1 = value !== Object(value) ? `${acc}${dir}' was added with value: ${value}\n`
            : `${acc}${dir}' was added with value: [complex value]\n`;
        }
        if (hasSign === '8') {
          acc1 = `${acc}${dir}' was updated. From ${value1} to ${value2}\n`;
        }
      }

      return acc1;
    }, '');
    return result;
  };
  return iter(tree, '')
    .split('\n').filter((el) => el)
    .map((el) => `Property '${el}`)
    .join('\n');
};

export default makePlainView;
