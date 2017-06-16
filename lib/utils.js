'use strict';

var find = require('find');
var path = require('path');
var foreach = require('foreach');

var fse = require('fs-extra');
var compressor = require('node-minify');

var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');


exports.process = function(opts) {
	switch(opts.mode) {
		case 'css':
			return handle_css(opts.rootpath, opts.backups);
			break;
		case 'js':
			return handle_js(opts.rootpath, opts.backups);
			break;
		case 'img':
			return minify_img(opts.rootpath, opts.backups);
			break;
		default:
			handle_css(opts.rootpath, opts.backups);
			handle_js(opts.rootpath, opts.backups);
			minify_img(opts.rootpath, opts.backups);
			break;
	}
};

var handle_css = function(rootpath, backups) {
	find.eachfile(/\.css$/, rootpath, function(file) {
		var filepath = path.join(path.dirname(file), path.basename(file));
		var bakfilename = path.basename(file, '.css') + '-bak.css';
		var bakfilepath = path.join(path.dirname(file), bakfilename);
		
		if (backups) {
			fse.copy(filepath, bakfilepath)
				.then(() => {
					minify_css(filepath);
				})
				.catch(err => {
					console.log('Could not create backup of ' + filepath + ', file won\'t be minified. Error: ' + err);
				});
		} else {
			minify_css(filepath);
		}
	});
};

var handle_js = function(rootpath, backups) {
	find.eachfile(/\.js$/, rootpath, function(file) {
		var filepath = path.join(path.dirname(file), path.basename(file));
		var bakfilename = path.basename(file, '.js') + '-bak.js';
		var bakfilepath = path.join(path.dirname(file), bakfilename);

		if (backups) {
			fse.copy(filepath, bakfilepath)
				.then(() => {
					minify_js(filepath);
				})
				.catch(err => {
					console.log('Could not create backup of ' + filepath + ', file won\'t be minified. Error: ' + err);
				});	
		} else {
			minify_js(filepath);
		}
	});
}


var minify_img = function(rootpath) {
	imagemin([rootpath + '/**/*.{jpg,png}'], 'img', {
			plugins: [
				imageminJpegRecompress({method: 'smallfry'}),
				imageminPngquant({quality: '65-80'})
			]
		}).then(files => {
			foreach(files, function(value, key, object) {
				console.log('Minified ' + files[key].path);
			});
		});	
}

var minify_css = function(filepath) {
	compressor.minify({
		compressor: 'clean-css',
		input: filepath,
		output: filepath,
		options: {
			advanced: true, 
			aggressiveMerging: true 
		},			
		callback: function (err, min) {
			if (err) {
				console.log('Error while minifying ' + filepath + ", " + err);
			} else {
				console.log('Minified ' + filepath);
			}
		}
	});				
}

var minify_js = function(filepath) {
	compressor.minify({
		compressor: 'gcc',
		input: filepath,
		output: filepath,
		callback: function (err, min) {
			if (err) {
				console.log('Error while minifying ' + filepath + ", " + err);
			} else {
				console.log('Minified ' + filepath);
			}
		}
	});
}
