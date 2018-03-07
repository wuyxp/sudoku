const gulp = require('gulp');

const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
// 编译webpack
gulp.task('webpack', () =>{
  return gulp.src('./js/index')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('../www/'))
});

// 编译less
gulp.task('less', () => {

})

gulp.task('default',['webpack', 'less']);