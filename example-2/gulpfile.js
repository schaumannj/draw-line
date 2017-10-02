var gulp = require('gulp');
var open = require('gulp-open');
var inject = require('gulp-inject');


var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {

    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(EXPRESS_ROOT));

    app.listen(EXPRESS_PORT);
}

// We'll need a reference to the tinylr
// object to send notifications of file changes
// further down
var lr;
function startLivereload() {

    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()`
function notifyLivereload(event) {
    // `gulp.watch()` events provide an absolute path
    // so we need to make it relative to the server root
    var fileName = require('path').relative(EXPRESS_ROOT, event.path);
    console.info("change file", fileName);
    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

// task to inject js files to index.html
gulp.task('index', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./schaumannj/**/*.js'], {read: false});

    return target.pipe(inject(sources)).pipe(gulp.dest('.'));
});

// task for open the browser
gulp.task('open', function(){
    gulp.src('').pipe(open({uri: 'http://localhost:'+EXPRESS_PORT}));
});

// Default task that will be run
// when no parameter is provided to gulp
gulp.task('run', function () {
    startExpress();
    startLivereload();
    gulp.watch(['./**/*.html', './**/*.css', './**/*.js' ], notifyLivereload);
    console.log('Express server is running at localhost:' + EXPRESS_PORT + '!');
});


gulp.task('default', ['index', 'run', 'open']);