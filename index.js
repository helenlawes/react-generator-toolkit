#!/usr/bin/env node

const args = require('args'),
	fs = require('fs-extra');

const currentDir = process.cwd();

const createFiles = (name) => {
	fs.copy(`${__dirname}/templates/component.js`, `${currentDir}/components/${name}/${name}.js`);
	fs.copy(`${__dirname}/templates/component.story.js`, `${currentDir}/components/${name}/${name}.story.js`);
	fs.copy(`${__dirname}/templates/component.styles.js`, `${currentDir}/components/${name}/${name}.styles.js`);
};

const aCommand = (name, sub, options) => {
	name // The name of the command
	sub // The output of .sub
	options // An object containing the options that have been used
	console.log(name, sub, options);
	createFiles(sub[0]);
};

args.config.name = 'rg';

args
	.option('styles', 'Enable style file to be created')
	.command('component', 'Create a new react component', aCommand, ['c']);


const flags = args.parse(process.argv);

console.log(flags)
