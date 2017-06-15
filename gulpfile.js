
var find = require('find');
var path = require('path');
var foreach = require('foreach');

var fse = require('fs-extra');
var compressor = require('node-minify');

var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var gulp = require('gulp');

// Starting with the docroot folder under current folder. Replace this with the folder/path the script to be in action.
const rootdir = 'docroot';
const rootpath = path.join(__dirname, rootdir);



gulp.task('minify-css', function() {
	find.eachfile(/\.css$/, rootpath, function(file) {
		var filepath = path.join(path.dirname(file), path.basename(file));
		var bakfilename = path.basename(file, '.css') + '-bak.css';
		var bakfilepath = path.join(path.dirname(file), bakfilename);
		
		fse.copy(filepath, bakfilepath)
			.then(() => {
				compressor.minify({
					compressor: 'clean-css',
					input: filepath,
					output: filepath,
					options: {
						advanced: true, 
						aggressiveMerging: true 
					},			
					callback: function (err, min) {
						if (err) throw err;
						console.log('Minified ' + filepath);
					}
				});				
			})
			.catch(err => {
				console.log('Could not create backup of ' + filepath + ', file won\'t be minified. Error: ' + err);
			});
	});
});

gulp.task('minify-js', function() {
	find.eachfile(/\.js$/, rootpath, function(file) {
		var filepath = path.join(path.dirname(file), path.basename(file));
		var bakfilename = path.basename(file, '.js') + '-bak.js';
		var bakfilepath = path.join(path.dirname(file), bakfilename);

		fse.copy(filepath, bakfilepath)
			.then(() => {
				compressor.minify({
					compressor: 'gcc',
					input: filepath,
					output: filepath,
					callback: function (err, min) {
						if (err) throw err;
						console.log('Minified ' + filepath);
					}
				});
			})
			.catch(err => {
				console.log('Could not create backup of ' + filepath + ', file won\'t be minified. Error: ' + err);
			});			
	});
});

gulp.task('minify-img', function() {
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
});


gulp.task('default', ['minify-css', 'minify-js', 'minify-img']);

