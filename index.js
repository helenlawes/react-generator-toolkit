#!/usr/bin/env node

const args = require('args'),
	fs = require('fs-extra');

const currentDir = process.cwd();

const createFiles = (name) => {
	fs.copy(`${__dirname}/templates/Component.js`, `${currentDir}/components/${name}/${name}.js`);
	fs.copy(`${__dirname}/templates/Component.story.js`, `${currentDir}/components/${name}/${name}.story.js`);
	fs.copy(`${__dirname}/templates/Component.styles.js`, `${currentDir}/components/${name}/${name}.styles.js`);
};

const component = (name, sub) => {
	createFiles(sub[0]);
};

args.config.name = 'rg';

args
	.command('component', 'Create a new react component', component, ['c']);


args.parse(process.argv);
