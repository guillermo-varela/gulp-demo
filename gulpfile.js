'use strict';

var gulp   = require('gulp');
var inject = require('gulp-inject');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var gutil  = require('gulp-util');
var cssnano = require('gulp-cssnano');

// Search for js and css files created for injection in index.html
gulp.task('inject', function () {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(
      gulp.src('**/*.js', {cwd: './app', read: false}), {
        relative: true
      }))
    .pipe(inject(
      gulp.src('**/*.css', {cwd: './app', read: false}), {
        relative: true
      }))
    .pipe(gulp.dest('./app'));
});

// Compress into a single file the ones in between of blocks "build:xx" in index.html
gulp.task('compress', ['inject'], function () {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(useref())
    .pipe(gulpIf('**/*.js', uglify({
      mangle: true
    }).on('error', gutil.log)))
    .pipe(gulpIf('**/*.css', cssnano()))
    .pipe(gulp.dest('./dist'));
});

// Copies the assets into the dist folder
gulp.task('copy:assets', function () {
  return gulp.src('assets*/**', {cwd: './app'})
    .pipe(gulp.dest('./dist'));
});
