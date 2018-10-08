#!/usr/bin/env node

const args = require('args'),
	fs = require('fs-extra'),
	path = require('path');

const currentDir = process.cwd();

const openFileReplace = async (path, replacement) => {
	const fileContents = await fs.readFile(path, 'utf8');
	return fileContents.replace(/Component/g, replacement);
};

const createFiles = async (name, dir) => {
	const componentFile = path.resolve(currentDir, dir, `${name}/${name}.js`);
	const storyFile = path.resolve(currentDir, dir, `${name}/${name}.story.js`);
	const styleFile = path.resolve(currentDir, dir, `${name}/${name}.styles.js`);

	let cfContents = await openFileReplace(`${__dirname}/templates/Component.js`, name);
	fs.outputFileSync(componentFile, cfContents);

	let storyContents = await openFileReplace(`${__dirname}/templates/Component.story.js`, name);
	fs.outputFileSync(storyFile, storyContents);

	let styleContents = await openFileReplace(`${__dirname}/templates/Component.styles.js`, name);
	fs.outputFileSync(styleFile, styleContents);

	/* eslint-disable no-console */
	console.log('created component files:');
	console.log(`* ${componentFile}`);
	console.log(`* ${storyFile}`);
	console.log(`* ${styleFile}`);
	/* eslint-enable no-console */
};

const component = (name, sub, options) => {
	createFiles(sub[0], options.dir);
};

args.config.name = 'rg';

args
	.option('dir', 'Directory to create component', 'src/components')
	.command('component', 'Create a new react component', component, ['c']);


args.parse(process.argv);
