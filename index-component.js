#!/usr/bin/env node

const args = require('args');

args
	.option('styles', 'Enable style file to be created');

const flags = args.parse(process.argv);

console.log('---',flags)
