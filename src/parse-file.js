import { createRequire } from 'module';
import yaml from 'js-yaml';

const parseFile = (fileName) => {
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const path = require('path');
  const filePath = path.resolve(fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const format = path.extname(fileName);
  const file = (format === 'json') ? JSON.parse(fileContent) : yaml.load(fileContent);
  return file;
};

export default parseFile;
