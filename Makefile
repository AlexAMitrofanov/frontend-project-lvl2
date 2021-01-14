install:
	npm install

gendiff:
	node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .