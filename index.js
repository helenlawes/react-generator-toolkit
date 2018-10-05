#!/usr/bin/env node

const args = require('args'),
	fs = require('fs-extra'),
	path = require('path');

const currentDir = process.cwd();

const createFiles = (name, dir) => {
	const componentFile = path.resolve(currentDir, dir, `${name}/${name}.js`);
	const storyFile = path.resolve(currentDir, dir, `${name}/${name}.story.js`);
	const styleFile = path.resolve(currentDir, dir, `${name}/${name}.styles.js`);
	fs.copy(`${__dirname}/templates/Component.js`, componentFile);
	fs.copy(`${__dirname}/templates/Component.story.js`, storyFile);
	fs.copy(`${__dirname}/templates/Component.styles.js`, styleFile);
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
