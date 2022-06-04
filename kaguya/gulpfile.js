var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var assets = require('postcss-assets');
var cssdeclsort = require('css-declaration-sorter'); //①「css-declaration-sorter」を読み込み
 
gulp.task('css', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(gulpPostcss([cssDeclarationSorter({order: 'smacss'})]))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass', function() {
  return gulp.src('./sass/_page-header.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([cssdeclsort({order: 'smacss'})])) //②「sass」の後に指定
    .pipe(postcss([assets({
      loadPaths: ['./images']
    })]))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./sass/'));
});