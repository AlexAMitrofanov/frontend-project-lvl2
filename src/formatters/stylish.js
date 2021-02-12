const stylish = (file) => {
  const iter = (tree, indent) => {
    const newIndent = '    ';
    const indBig = `${newIndent.slice(2)}${indent}`;
    const indSmall = `${indent}${newIndent}`;
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      const signs = ['+', '-', '8'];
      const hasSign = signs.filter((sign) => key.includes(sign))[0];
      if (!hasSign) {
        if (tree[key] !== Object(tree[key])) {
          return key[0] === ' ' ? acc.concat(`\n${indBig}${key}: ${tree[key]}`) : acc.concat(`\n${indSmall}${key}: ${tree[key]}`);
        }
        return key[0] === ' ' ? acc.concat(`\n${indBig}${key}: {${iter(tree[key], `${indSmall}`)}\n${indSmall}}`)
          : acc.concat(`\n${indSmall}${key}: {${iter(tree[key], `${indSmall}`)}\n${indSmall}}`);
      }
      if (hasSign) {
        if (hasSign !== '8') {
          if (tree[key] !== Object(tree[key])) {
            return acc.concat(`\n${indBig}${key}: ${tree[key]}`);
          }
          return acc.concat(`\n${indBig}${key}: {${iter(tree[key], `${indSmall}`)}\n${indSmall}}`);
        }

        const [value1, value2] = tree[key];
        if (value1 === Object(value1)) {
          return acc.concat(`\n${indBig}- ${key.slice(2)}: {${iter(value1, `${indSmall}`)}\n${indSmall}}\n${indBig}+ ${key.slice(2)}: ${value2}`);
        }
        if (value2 === Object(value2)) {
          return acc.concat(`\n${indBig}- ${key.slice(2)}: ${value1}\n${indBig}+ ${key.slice(2)}: {${iter(value2, `${indSmall}`)}\n${indSmall}}`);
        }
        return acc.concat(`\n${indBig}- ${key.slice(2)}: ${value1}\n${indBig}+ ${key.slice(2)}: ${value2}`);
      }
      return acc;
    }, []);
    return result;
  };
  const res = iter(file, '');
  return `{${res.flatMap((el) => el)
    .join('')
    .split('')
    .filter((el) => el !== ',')
    .join('')}\n}`;
};

export default stylish;
