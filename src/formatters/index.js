import stylish from './stylish.js';
import plain from './plain.js';
import json from './format-json-style.js';

const applyFormatter = (file, formatterName) => {
  const formatters = {};
  formatters.stylish = stylish;
  formatters.plain = plain;
  formatters.json = json;
  return formatters[formatterName](file);
};

export default applyFormatter;
