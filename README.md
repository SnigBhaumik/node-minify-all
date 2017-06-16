# node-minify-all
Minifies CSS, JavaScripts and Images under the current directory tree with gulp task wrapper.


# What's new?
- Of course, lots of image, js, css minifiers are available around. The difference is here we can write individual business rules per file (for example, in case you don't want a particular file not to be minified).
- You can run individual tasks or all the tasks or any combination of these.


# Usage

## Using gulp
You can pass two command line arguments (both optional).
- rootpath: name of the folder under current directory, where the process should execute. Default `docroot`.
- backups: boolean value to determine whether backup copy should be created while minifying. Default `false`.

Four gulp tasks are defined.
```sh
$ gulp minify-css --rootpath myfolder
Minifies all the CSS files under the directory (files with .css extension).
```
```sh
$ gulp minify-js --backups true
Minifies all the JavaScript files under the directory (files with .js extension).
```
```sh
$ gulp minify-img --rootpath=myfolder --backups=true
Minifies all the image files under the directory (files with .jpg and .png extension).
```
```sh
$ gulp 
Runs all the above three tasks, minifiying all images, CSS and JS files.
```

## Using node cli
You can pass three command line arguments (all optional).
- rootpath: name of the folder under current directory, where the process should execute. Default `docroot`.
- mode: what should be minified. Options are `css`, `js`, `img`, `all`. Default `all`.
- backups: boolean value to determine whether backup copy should be created while minifying. Default `false`.
```sh
$ node index --rootpath=myfolder --mode=css
Minifies all the CSS files under the directory (files with .css extension).
```
```sh
$ node index --rootpath myfolder --mode js --backups true
Minifies all the JavaScript files under the directory (files with .js extension).
```
```sh
$ node index --rootpath=myfolder --mode=img --backups=true
Minifies all the image files under the directory (files with .jpg and .png extension).
```
```sh
$ node index --rootpath myfolder --backups true
Runs all the above three tasks, minifiying all images, CSS and JS files.
```


## API
Use the `minify-all-api` for this.
```js
var minify = require('node-minify-all/minify-all-api');

var opts = {
	rootpath: 'myfolder',
	mode: 'all',
	backups: false
};

minify.process(opts);
```


# Dependencies
- [gulp](https://www.npmjs.com/package/gulp)
- [imagemin](https://www.npmjs.com/package/imagemin)
- [node-minify](https://www.npmjs.com/package/node-minify)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [yargs](https://www.npmjs.com/package/yargs)


# License
MIT
