'use strict';

const gulp     = require('gulp'),
      uglify   = require('gulp-uglify'),
      concat   = require('gulp-concat'),
      babel    = require('gulp-babel');

const path = require('path');


/**
 * Files
 */

const vendor = {
  js: [
    'node_modules/nasa-launcher/dist/Nasa.js'
  ]
};

const scripts = {
  dir: 'nasa',
  files: [
    'utils/*.js',
    'modules/*.js',
    'pages/*.js',
    'd3/*.js',
    'd3/charts/*.js',
    'd3/datasets/*.js',
    'launchfile.js'
  ]
};

function filePaths(fileObj) {
  return fileObj.files.map(file => path.join(fileObj.dir, file));
}

function logError(e) {
  console.error(e.toString());
  this.emit('end');
}


/**
 * Tasks
 */

gulp.task('transpileScripts', () => {
  return gulp.src(vendor.js.concat(filePaths(scripts)))
             .pipe(babel({presets: ['babel-preset-env']}).on('error', logError))
             .pipe(concat('build.js'))
             .pipe(uglify().on('error', logError))
             .pipe(gulp.dest(path.join(__dirname, 'assets/scripts')))
});

gulp.task('watch', () => {
  gulp.watch(filePaths(scripts), ['transpileScripts']);
});


/**
 * Triggers
 */

gulp.task('start', [
  'transpileScripts',
  'watch',
]);

gulp.task('build', [
  'transpileScripts',
]);


gulp.task('default', ['start']);
