/*
 * node-minify-all - api.
 * https://github.com/SnigBhaumik/node-minify-all
 *
 * Copyright (c) 2017 Snig Bhaumik.
 * MIT.
 */
 
'use strict';

var utils = require('./lib/utils');

exports.process = function(params) { 
	var opts = {
		rootpath: params.rootpath || 'docroot',
		mode: params.mode || 'all',
		backups: params.backups || false
	};

	utils.process(opts);
}
