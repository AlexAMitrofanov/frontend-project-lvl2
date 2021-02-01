const makePlainView = (file) => {
  const keys = Object.keys(file);
  const result = keys.reduce((acc, key) => {
    const signs = ['+', '-'];
    const hasSign = signs.filter((sign) => key.includes(sign)).length;
    let acc1;
    if (!hasSign) {
      acc1 = acc.concat(`Propertty '${key}' was removed\n`);
    }
    if (hasSign) {
      acc1 = acc.concat(`Propertty '${key}' was added\n`);
    }
    return acc1;
  }, '');
  console.log(result);
  return result;
};

export default makePlainView;
