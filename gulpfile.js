const gulp = require('gulp');
const browserify = require('browserify');
const connect = require('gulp-connect');

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
  const browserifyObj = browserify({
    entries: 'demo01/app.js'
  }).transform('babelify', {
    presets: ["@babel/preset-env", "es2015"]
  });
  return browserifyObj.bundle()
    .pipe(gulp.dest('build/demo01/js/'));
}

function watch(cb) {
  gulp.watch('./demo01/*.html', html);
  gulp.watch('./demo01/app.js', jsTask);
  cb();
}

exports.default = gulp.series(jsTask, html, devServer, watch);
