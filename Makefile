install:
	npm install

gendiff:
	node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8