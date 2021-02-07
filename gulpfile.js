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

function copyAssets() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images'));
}


const build = gulp.series(copyAssets, jsTask, html);

function watch(cb) {
  gulp.watch('./src/**/*', build);
  cb();
}

exports.default = gulp.series(build, devServer, watch);
