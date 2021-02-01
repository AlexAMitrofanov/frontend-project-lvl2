import stylish from './stylish.js';

const applyFormatter = (file, formatterName) => {
  const formatters = {};
  formatters.stylish = stylish;
  return formatters[formatterName](file);
};

export default applyFormatter;
