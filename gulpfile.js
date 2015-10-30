var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var ts = require('gulp-typescript');
var watch = require('gulp-watch');

var paths = {
  ionicSass: ['./scss-ionic/ionic.app.scss'],
  sass: ['./src/**/*.scss'],
  ts: ['./src/**/*.ts']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('sass-ionic', function(done) {
  gulp.src(paths.ionicSass)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(concat('ionic.app.min.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('ts', function() {
  return gulp.src(paths.ts)
    .pipe(ts({
      target: 'ES5',
      out: 'app.js'
    }))
    .js
    .pipe(gulp.dest('www/js'));
});

gulp.task('watch', ['sass', 'sass-ionic', 'ts'], function() {
  watch(paths.sass, function() {
    gulp.start('sass');
  });
  watch(paths.ionicSass, function() {
    gulp.start('sass-ionic');
  });
  watch(paths.ts, function() {
    gulp.start('ts');
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
