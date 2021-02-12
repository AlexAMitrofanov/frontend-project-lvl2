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
          const a = key[0] === ' ' ? `\n${indBig}${key}: ${tree[key]}` : `\n${indSmall}${key}: ${tree[key]}`;
          return acc.concat(a);
        }
        const b = key[0] === ' ' ? `\n${indBig}${key}: {${iter(tree[key], `${indSmall}`)}\n${indSmall}}`
          : `\n${indSmall}${key}: {${iter(tree[key], `${indSmall}`)}\n${indSmall}}`;
        return acc.concat(b);
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
          const c = `\n${indBig}- ${key.slice(2)}: {${iter(value1, `${indSmall}`)}\n${indSmall}}\n${indBig}+ ${key.slice(2)}: ${value2}`;
          return acc.concat(c);
        }
        if (value2 === Object(value2)) {
          const d = `\n${indBig}- ${key.slice(2)}: ${value1}\n${indBig}+ ${key.slice(2)}: {${iter(value2, `${indSmall}`)}\n${indSmall}}`;
          return acc.concat(d);
        }
        const e = `\n${indBig}- ${key.slice(2)}: ${value1}\n${indBig}+ ${key.slice(2)}: ${value2}`;
        return acc.concat(e);
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
