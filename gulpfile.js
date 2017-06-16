/*
 * node-minify-all - gulp wrapper.
 * https://github.com/SnigBhaumik/node-minify-all
 *
 * Copyright (c) 2017 Snig Bhaumik.
 * MIT.
 */
 
'use strict';
 
var gulp = require('gulp');
var yargs = require('yargs');

var utils = require('./lib/utils');

// Analyze input settings. Mode is not required in gulp.
var argv = yargs.argv;
var opts = {
	rootpath: argv.rootpath || 'docroot',
	mode: '',
	backups: argv.backups || false
};


gulp.task('minify-css', function() {
	opts.mode = 'css';
	utils.process(opts);	
});

gulp.task('minify-js', function() {
	opts.mode = 'js';
	utils.process(opts);	
});

gulp.task('minify-img', function() {
	opts.mode = 'img';
	utils.process(opts);	
});

gulp.task('default', function() {
	opts.mode = 'all';
	utils.process(opts);	
});

