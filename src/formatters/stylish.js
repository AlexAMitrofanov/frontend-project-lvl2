const stylishSimplObj = (obj, indent) => {
  const indStep = '    ';
  const newInd = `${indStep}${indent}`;
  const keys = Object.keys(obj);
  const res = keys.reduce((acc, key) => ((obj[key] !== Object(obj[key])) ? acc.concat(`\n${newInd}${key}: ${obj[key]}`) : acc.concat(`\n${newInd}${key}: {${stylishSimplObj(obj[key], `${newInd}`)}\n${newInd}}`)), '');
  return res;
};

const stylish = (file) => {
  const iter = (tree, indent) => {
    const indStep = '    ';
    const indSmall = `${indStep.slice(2)}${indent}`;
    const indBig = `${indStep}${indent}`;
    const result = tree.reduce((acc, elem) => {
      const { key, status, value } = elem;
      if (status === 'unchanged') {
        if (value !== Object(value)) {
          return acc.concat(`\n${indBig}${key}: ${value}`);
        }
        return acc.concat(`\n${indBig}${key}: {${iter(value, `${indBig}`)}\n${indBig}}`);
      }
      if (status === 'added') {
        if (value !== Object(value)) {
          return acc.concat(`\n${indSmall}+ ${key}: ${value}`);
        }
        return acc.concat(`\n${indSmall}+ ${key}: {${stylishSimplObj(value, `${indBig}`)}\n${indBig}}`);
      }
      if (status === 'removed') {
        if (value !== Object(value)) {
          return acc.concat(`\n${indSmall}- ${key}: ${value}`);
        }
        return acc.concat(`\n${indSmall}- ${key}: {${stylishSimplObj(value, `${indBig}`)}\n${indBig}}`);
      }

      if (elem.value1 === Object(elem.value1)) {
        return acc.concat(`\n${indSmall}- ${key}: {${stylishSimplObj(elem.value1, `${indBig}`)}\n${indBig}}\n${indSmall}+ ${key}: ${elem.value2}`);
      }
      if (elem.value2 === Object(elem.value2)) {
        return acc.concat(`\n${indSmall}- ${key}: ${elem.value1}\n${indSmall}+ ${key}: {${stylishSimplObj(elem.value2, `${indBig}`)}\n${indBig}}`);
      }
      return acc.concat(`\n${indSmall}- ${key}: ${elem.value1}\n${indSmall}+ ${key}: ${elem.value2}`);
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
