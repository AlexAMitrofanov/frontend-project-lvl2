const stylish = (file) => {
  const iter = (tree, indent) => {
    const newIndent = '    ';
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      let acc1;
      const signs = ['+', '-', '8'];
      const hasSign = signs.filter((sign) => key.includes(sign))[0];
      let value1;
      let value2;
      if (Array.isArray(tree[key])) {
        [value1, value2] = tree[key];
      }
      if (!hasSign) {
        if (tree[key] !== Object(tree[key])) {
          acc1 = key[0] === ' ' ? acc.concat(`\n${newIndent.slice(2)}${indent}${key}: ${tree[key]}`) : acc.concat(`\n${newIndent}${indent}${key}: ${tree[key]}`);
          return acc1;
        }
        acc1 = key[0] === ' ' ? acc.concat(`\n${newIndent.slice(2)}${indent}${key}: {${iter(tree[key], `${indent}${newIndent}`)}\n${indent}${newIndent}}`)
          : acc.concat(`\n${newIndent}${indent}${key}: {${iter(tree[key], `${indent}${newIndent}`)}\n${indent}${newIndent}}`);
        return acc1;
      }
      if (hasSign) {
        if (hasSign !== '8') {
          if (tree[key] !== Object(tree[key])) {
            acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}${key}: ${tree[key]}`);
            return acc1;
          }
          acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}${key}: {${iter(tree[key], `${indent}${newIndent}`)}\n${indent}${newIndent}}`);
          return acc1;
        }
        if (value1 === Object(value1)) {
          acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}- ${key.slice(2)}: {${iter(value1, `${indent}${newIndent}`)}\n${indent}${newIndent}}`)
            .concat(`\n${newIndent.slice(2)}${indent}+ ${key.slice(2)}: ${value2}`);
          return acc1;
        }
        if (value2 === Object(value2)) {
          acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}- ${key.slice(2)}: ${value1}`)
            .concat(`\n${newIndent.slice(2)}${indent}+ ${key.slice(2)}: {${iter(value2, `${indent}${newIndent}`)}\n${indent}${newIndent}}`);
          return acc1;
        }

        acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}- ${key.slice(2)}: ${value1}`)
          .concat(`\n${newIndent.slice(2)}${indent}+ ${key.slice(2)}: ${value2}`);
        return acc1;
      }
      return acc1;
    }, '');
    return result;
  };
  // console.log(`{${iter(file, '')}\n}`);
  return `{${iter(file, '')}\n}`;
};

export default stylish;
