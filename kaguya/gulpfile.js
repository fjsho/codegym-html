var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var gulpPostcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var assets = require('postcss-assets');
var cssDeclarationSorter = require('css-declaration-sorter'); //①「css-declaration-sorter」を読み込み
 
gulp.task('css', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})]))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass', function() {
  return gulp.src('./sass/style.scss') // FIXME:複数ファイルにそれぞれ指定する必要がある。
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})])) //②「sass」の後に指定
    .pipe(gulpPostcss([assets({
      loadPaths: ['./images']
    })]))
    .pipe(gulpPostcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./sass/'));
});