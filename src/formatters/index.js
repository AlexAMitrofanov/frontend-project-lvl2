import stylish from './stylish.js';
import plain from './plain.js';
import json from './format-json.js';

const applyFormatter = (file, formatterName) => {
  const formatters = {
    stylish,
    plain,
    json,
  };
  return formatters[formatterName](file);
};

export default applyFormatter;
