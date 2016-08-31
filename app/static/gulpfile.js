var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel');


gulp.task('es6', function() {
    browserify('./app/main.js')
        .transform(babelify, {presets: ["es2015", "react", "stage-0"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('default', function() {
    gulp.watch('./app/*.js', ['es6']);
});
