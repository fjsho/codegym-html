const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');
 
gulp.task('default', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})]))
    .pipe(gulp.dest('./assets/css/'));
});