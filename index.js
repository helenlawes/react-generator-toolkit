#!/usr/bin/env node

const yargs = require('yargs'),
	fs = require('fs-extra'),
	path = require('path');

const currentDir = process.cwd();

const openFileReplace = async (path, replacement) => {
	const fileContents = await fs.readFile(path, 'utf8');
	return fileContents.replace(/_COMPONENT_/g, replacement);
};

const component = async argv => {
	const { name, dir, nsb, nsc, t } = argv;
	const componentFile = path.resolve(currentDir, dir, `${name}/${name}.js`);
	const storyFile = path.resolve(currentDir, dir, `${name}/${name}.story.js`);
	const styleFile = path.resolve(
		currentDir,
		dir,
		`${name}/${name}.styles.js`,
	);

	const fileName = t === 'class' ? 'Component.controller.js' : 'Component.js';
	const cfContents = await openFileReplace(
		`${__dirname}/templates/${fileName}`,
		name,
	);
	fs.outputFileSync(componentFile, cfContents);

	if (!nsb) {
		const storyContents = await openFileReplace(
			`${__dirname}/templates/Component.story.js`,
			name,
		);
		fs.outputFileSync(storyFile, storyContents);
	}

	if (!nsc) {
		const styleContents = await openFileReplace(
			`${__dirname}/templates/Component.styles.js`,
			name,
		);
		fs.outputFileSync(styleFile, styleContents);
	}

	/* eslint-disable no-console */
	console.log('created component files:');
	console.log(`* ${componentFile}`);
	!nsb && console.log(`* ${storyFile}`);
	!nsc && console.log(`* ${styleFile}`);
	/* eslint-enable no-console */
};

const generate = argv => {
	const { project } = argv;
	const folder = path.resolve(currentDir, project);
	require('download-git-repo')(
		'bitbucket:helen_lawes/minimal-react-boilerplate',
		folder,
		err => {
			if (err) {
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
				process.exit();
			}
			/* eslint-disable no-console */
			console.log(`Created new project in: ${folder}`);
			console.log('\nBegin with:\n');
			console.log(`cd ${project}`);
			console.log('npm install');
			/* eslint-enable no-console */
		},
	);
};

yargs
	.command({
		command: 'new [project]',
		aliases: ['n'],
		desc: 'Create a new react project from boilerplate',
		builder: yargs => {
			yargs.positional('project', {
				describe: 'project folder name',
				default: 'my-app',
			});
		},
		handler: generate,
	})
	.command({
		command: 'component [name]',
		aliases: ['c'],
		desc: 'Create a new react component',
		builder: yargs => {
			yargs
				.positional('name', {
					describe: 'name of generated component',
					default: 'Component',
				})
				.option('dir', {
					alias: 'd',
					describe: 'directory to output components',
					default: 'src/components',
				})
				.option('type', {
					alias: 't',
					describe: 'type of generated component',
					choices: ['functional', 'class'],
					default: 'functional',
				})
				.option('no-styled-component', {
					alias: 'nsc',
					describe: 'don’t output styled-component file',
				})
				.option('no-storybook', {
					alias: 'nsb',
					describe: 'don’t output storybook file',
				});
		},
		handler: component,
	})
	.scriptName('rg').argv;
