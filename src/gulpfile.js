const gulp = require('gulp');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const less = require('gulp-less');
// 编译webpack
gulp.task('webpack', () =>{
  return gulp.src('./js/index')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('../www/js/'))
});

// 编译less
gulp.task('less', () => {
  return gulp.src('./less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css/'))
})

gulp.task('default',['webpack', 'less']);

gulp.task('watch', ()=>{
  gulp.watch('./js/**/*.js',['webpack'])
  gulp.watch('./less/**/*.less',['less'])
})