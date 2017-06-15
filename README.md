# node-minify-all
Minifies CSS, JavaScripts and Images under the current directory tree with gulp task wrapper.

# What's new?
- Of course, lots of image, js, css minifiers are available around. The difference is here we can write individual business rules per file (for example, in case you don't want a particular file not to be minified).
- You can run individual tasks or all the tasks or any combination of these.


# Usage
Four gulp tasks are defined.
```sh
$ gulp minify-css
Minifies all the CSS files under the directory (files with .css extension).
```
```sh
$ gulp minify-js
Minifies all the JavaScript files under the directory (files with .js extension).
```
```sh
$ gulp minify-img
Minifies all the image files under the directory (files with .jpg and .png extension).
```
```sh
$ gulp 
Runs all the above three tasks, minifiying all images, CSS and JS files.
```

## Setting root folder
Set the value of `rootdir` constant in gulpfile.js


# Dependencies
- [gulp](https://www.npmjs.com/package/gulp)
- [imagemin](https://www.npmjs.com/package/imagemin)
- [node-minify](https://www.npmjs.com/package/node-minify)
- [fs-extra](https://www.npmjs.com/package/fs-extra)

# License
MIT
