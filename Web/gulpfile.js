/// <vs SolutionOpened='vet, compressOnSave' />
//#region variables
var gulp = require('gulp'),
    args = require('yargs').argv,
    config = require('./gulp.config')(),//a separate file is created for holding all the configuration/magic strings; because is not a module, it has identify the file and call it like a function
    del = require('del'),
    $ = require('gulp-load-plugins')({ lazy: true });//instead of loading all the dependent modules, the gulp-load-plugins can be used and they are loaded automatically
//#endregion

//#region required modules - replaced by plugin
    //jshint = require('gulp-jshint'),
    //gutil = require('gulp-util'),
    //jscs = require('gulp-jscs');
    //minify = require('gulp-minify'),
    //gPrint = require('gulp-print'),
    //gIf = require('gulp-if');
//#endregion

//#region tasks
gulp.task('vet', function () {
    log('Analyze code with jshint and jscs...');
    return gulp.src(config.testjs)//it has to be on the same row; otherwise it will treat return as a separate command
        .pipe($.if(args.verbose, $.print()))//for calling like: gulp vet --verbose
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jshint.reporter('jshint-stylish'))
        //.pipe($.jshint.reporter('fail'))//so the task will fail if there is any error
        ;
});

gulp.task('compress', ['cleanFisiere'], function () {
    log('starting to compress...');
    gulp.src(config.testjs)
      .pipe($.plumber())
      .pipe($.minify())
      .pipe(gulp.dest(config.fisiere))
});

gulp.task('cleanFisiere', function (callback) {
    var files = config.fisiere + '/**/*.js';
    clean(files, callback);
});

gulp.task('compressOnSave', function () {
    gulp.watch(config.testjs, ['compress']);
});
//#endregion

//#region custom functions
function clean(path, callback) {
    log($.util.colors.red('deleting files from ' + path));
    del(path);
    callback();
}
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}
//#endregion