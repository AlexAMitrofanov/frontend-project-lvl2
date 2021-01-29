import getDiffTree from './getDifTree.js';

const makeRequiredView = (file1, file2) => {
  const fileForFormat = getDiffTree(file1, file2);
  const iter = (tree, indent) => {
    const newIndent = '    ';
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key) => {
      let acc1;
      const signs = ['+', '-'];
      const hasSign = signs.filter((sign) => key.includes(sign)).length;
      if (tree[key] !== Object(tree[key])) {
        if (hasSign) {
          acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}${key}: ${tree[key]}`);
          return acc1;
        }
        acc1 = acc.concat(`\n${newIndent}${indent}${key}: ${tree[key]}`);
        return acc1;
      }
      if (hasSign) {
        acc1 = acc.concat(`\n${newIndent.slice(2)}${indent}${key}: {${iter(tree[key], `${indent}${newIndent}`)}\n${indent}${newIndent}}`);
        return acc1;
      }
      acc1 = acc.concat(`\n${newIndent}${indent}${key}: {${iter(tree[key], `${indent}${newIndent}`)}\n${indent}${newIndent}}`);
      return acc1;
    }, '');
    return result;
  };
  return `{${iter(fileForFormat, '')}\n}`;
};

export default makeRequiredView;
