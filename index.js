/*
 * node-minify-all - node cli.
 * https://github.com/SnigBhaumik/node-minify-all
 *
 * Copyright (c) 2017 Snig Bhaumik.
 * MIT.
 */
 
'use strict';

var yargs = require('yargs');
var utils = require('./lib/utils');

var argv = yargs.argv;
var opts = {
	rootpath: argv.rootpath || 'docroot',
	mode: argv.mode || 'all',
	backups: argv.backups || false
};

utils.process(opts);	
