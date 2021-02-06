const gulp = require('gulp');
const browserify = require('browserify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');


function devServer(cb) {
  connect.server({
    root: './build',
    livereload: true
  });
  cb();
};

// 打包html到dev目录
function html() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
}

function jsTask() {
  return browserify({
      entries: 'src/app.js'
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/js'));
}

function watch(cb) {
  gulp.watch('./src/*.html', html);
  gulp.watch('./src/app.js', gulp.series(jsTask, html));
  cb();
}

exports.default = gulp.series(jsTask, html, devServer, watch);
