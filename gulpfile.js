const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
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
    .transform(babelify, {
      presets: ['@babel/preset-env']
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
