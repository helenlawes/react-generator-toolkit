#!/usr/bin/env node

const args = require('args'),
	fs = require('fs-extra'),
	path = require('path');

const currentDir = process.cwd();

const openFileReplace = async (path, replacement) => {
	const fileContents = await fs.readFile(path, 'utf8');
	return fileContents.replace(/Component/g, replacement);
};

const createFiles = async (name, dir, styles, story) => {
	const componentFile = path.resolve(currentDir, dir, `${name}/${name}.js`);
	const storyFile = path.resolve(currentDir, dir, `${name}/${name}.story.js`);
	const styleFile = path.resolve(currentDir, dir, `${name}/${name}.styles.js`);

	let cfContents = await openFileReplace(`${__dirname}/templates/Component.js`, name);
	fs.outputFileSync(componentFile, cfContents);

	if (story) {
		let storyContents = await openFileReplace(`${__dirname}/templates/Component.story.js`, name);
		fs.outputFileSync(storyFile, storyContents);
	}

	if (styles) {
		let styleContents = await openFileReplace(`${__dirname}/templates/Component.styles.js`, name);
		fs.outputFileSync(styleFile, styleContents);
	}

	/* eslint-disable no-console */
	console.log('created component files:');
	console.log(`* ${componentFile}`);
	story && console.log(`* ${storyFile}`);
	styles && console.log(`* ${styleFile}`);
	/* eslint-enable no-console */
};

const component = (name, sub, options) => {
	createFiles(sub[0]||'Component', options.dir, parseBool(options.styles), parseBool(options.story));
};

const parseBool = value => value === 'true' ? true : false;

args.config.name = 'rg';

args
	.option('dir', 'Directory to create component', 'src/components')
	.option('styles', 'Enable styles file to be created for component', 'true')
	.option('story', 'Enable story file to be created for component', 'true')
	.command('component', 'Create a new react component', component, ['c']);


const flags = args.parse(process.argv);

if (Object.keys(flags).length !== 0) {
	const dir = args.sub[0] || 'my-app';
	const folder = path.resolve(currentDir, dir);
	require('download-git-repo')('bitbucket:helen_lawes/minimal-react-boilerplate', folder, err => {
		if (err) {
			/* eslint-disable no-console */
			console.error(err);
			/* eslint-enable no-console */
			process.exit();
		}
		/* eslint-disable no-console */
		console.log(`Created new project in: ${folder}`);
		console.log('\nBegin with:\n');
		console.log(`cd ${dir}`);
		console.log('npm install');
		/* eslint-enable no-console */
	});
}
