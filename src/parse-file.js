import { createRequire } from 'module';
import yaml from 'js-yaml';

const parseFile = (fileName) => {
  let file;
  const require = createRequire(import.meta.url);
  const fs = require('fs');
  const path = require('path');
  const filePath = path.resolve(fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const [, format] = fileName.split('.');
  if (format === 'json') {
    file = JSON.parse(fileContent);
  }
  file = yaml.load(fileContent);
  return file;
};

export default parseFile;
