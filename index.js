#!/usr/bin/env node

const yargs = require('yargs'),
	fs = require('fs-extra'),
	path = require('path');

const currentDir = process.cwd();

const openFileReplace = async (path, replacements) => {
	let fileContents = await fs.readFile(path, 'utf8');
	replacements.forEach(({ find, replace }) => {
		fileContents = fileContents.replace(find, replace);
	});
	return fileContents;
};

const component = async argv => {
	const { name, base, dir, specDir, nsb, nsc, t, nt, l } = argv;
	const fileExtJsx = l === 'js' ? 'js' : 'tsx';
	const componentFile = path.resolve(
		currentDir,
		base,
		dir,
		`${name}/${name}.${fileExtJsx}`,
	);
	const storyFile = path.resolve(
		currentDir,
		base,
		dir,
		`${name}/${name}.story.${fileExtJsx}`,
	);
	const styleFile = path.resolve(
		currentDir,
		base,
		dir,
		`${name}/${name}.styles.${fileExtJsx}`,
	);
	const specFile = path.resolve(
		currentDir,
		base,
		specDir,
		`${name}Spec.${fileExtJsx}`,
	);

	const relativePath = path.posix.relative(
		path.posix.resolve(currentDir, base, specDir),
		path.posix.resolve(currentDir, base, dir, `${name}`),
	);

	const replacements = [
		{
			find: /_COMPONENT_/g,
			replace: name,
		},
	];

	const fileName =
		t === 'class'
			? `Component.controller.${fileExtJsx}`
			: `Component.${fileExtJsx}`;
	const nscFolder = nsc ? 'nsc/' : '';
	const cfContents = await openFileReplace(
		`${__dirname}/templates/${nscFolder}${fileName}`,
		replacements,
	);
	fs.outputFileSync(componentFile, cfContents);

	if (!nt) {
		const specContents = await openFileReplace(
			`${__dirname}/templates/ComponentSpec.${fileExtJsx}`,
			[...replacements, { find: /_PATH_/g, replace: relativePath }],
		);
		fs.outputFileSync(specFile, specContents);
	}

	if (!nsb) {
		const storyContents = await openFileReplace(
			`${__dirname}/templates/Component.story.${fileExtJsx}`,
			replacements,
		);
		fs.outputFileSync(storyFile, storyContents);
	}

	if (!nsc) {
		const styleContents = await openFileReplace(
			`${__dirname}/templates/Component.styles.${fileExtJsx}`,
			replacements,
		);
		fs.outputFileSync(styleFile, styleContents);
	}

	/* eslint-disable no-console */
	console.log('created component files:');
	console.log(`* ${componentFile}`);
	!nsb && console.log(`* ${storyFile}`);
	!nsc && console.log(`* ${styleFile}`);
	!nt && console.log(`* ${specFile}`);
	/* eslint-enable no-console */
};

const generate = argv => {
	const { project, l } = argv;
	const folder = path.resolve(currentDir, project);
	const repo =
		l === 'js'
			? 'minimal-react-boilerplate'
			: 'minimal-react-typescript-boilerplate';
	require('download-git-repo')(
		`bitbucket:helen_lawes/${repo}`,
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
	.config('config')
	.global('config')
	.default('config', '.rgrc.json')
	.command({
		command: 'new [project]',
		aliases: ['n'],
		desc: 'Create a new react project from boilerplate',
		builder: yargs => {
			yargs
				.positional('project', {
					describe: 'project folder name',
					default: 'my-app',
				})
				.option('language', {
					alias: 'l',
					describe: 'code language to use',
					choices: ['js', 'typescript'],
					default: 'js',
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
				.option('base', {
					alias: 'b',
					describe: 'react app base directory',
					default: 'src',
				})
				.option('dir', {
					alias: 'd',
					describe:
						'directory to output components (relative to base directory)',
					default: 'components',
				})
				.option('spec-dir', {
					alias: 'sd',
					describe:
						'directory to output specs (relative to base directory)',
					default: 'specs/components',
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
				})
				.option('no-tests', {
					alias: 'nt',
					describe: 'don’t output spec file',
				})
				.option('language', {
					alias: 'l',
					describe: 'code language to use',
					choices: ['js', 'typescript'],
					default: 'js',
				});
		},
		handler: component,
	})
	.scriptName('rg').argv;
