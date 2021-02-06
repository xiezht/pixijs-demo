const gulp = require('gulp');
const browserify = require('browserify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');


function devServer(cb) {
  connect.server({
    root: './build/demo01',
    livereload: true
  });
  cb();
};

// 打包html到dev目录
function html() {
  return gulp.src('./demo01/*.html')
    .pipe(gulp.dest('./build/demo01'))
    .pipe(connect.reload());
}

function jsTask() {
  return browserify({
      entries: 'demo01/app.js'
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/demo01/js'));
}

function watch(cb) {
  gulp.watch('./demo01/*.html', html);
  gulp.watch('./demo01/app.js', gulp.series(jsTask, html));
  cb();
}

exports.default = gulp.series(jsTask, html, devServer, watch);
