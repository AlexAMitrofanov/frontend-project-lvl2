import stylish from './stylish.js';
import plain from './plain.js';

const applyFormatter = (file, formatterName) => {
  const formatters = {};
  formatters.stylish = stylish;
  formatters.plain = plain;
  return formatters[formatterName](file);
};

export default applyFormatter;
