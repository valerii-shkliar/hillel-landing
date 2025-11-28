const { src, dest, series, parallel, watch } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

function copyJS() {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/js/'));
}
// function copyLibraryJS() {
//   return src('./src/js/owl-carousel/*.js').pipe(dest('./dist/js/owl-carousel/'));
// }
function copyCSS() {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css/'));
}
function copyIMG() {
  return src(
    [
      './src/images/**/*.png',
      './src/images/**/*.jpg',
      './src/images/**/*.gif',
      './src/images/**/*.svg',
    ],
    {
      encoding: false,
    }
  ).pipe(dest('./dist/images/'));
}

// function copySVG() {
//   return src('./src/images/decor/**/*.svg', {
//     encoding: false,
//   }).pipe(dest('./dist/images/decor/'));
// }
// function copySprites() {
//   return src('./src/images/sprites/**/*.svg', {
//     encoding: false,
//   }).pipe(dest('./dist/images/sprites/'));
// }
function copyFont() {
  return src('./src/fonts/**/*.*', {
    encoding: false,
  }).pipe(dest('./dist/fonts/'));
}
function copyHTML() {
  return src('./src/*.html').pipe(dest('./dist/html/'));
}

function build() {
  return parallel(
    copyIMG,
    // copySVG,
    // copySprites,
    copyFont,
    copyJS,
    copyCSS,
    // copyLibraryJS,

    copyHTML
  );
}
function start(done) {
  browserSync.init({
    server: {
      baseDir: '.',
    },
  });
  watch('./src/html/*.html', series(copyHTML, reload));
  watch('./src/scss/**/*.scss', series(copyCSS, reload));
  // watch('./src/js/owl-carousel/*.js', series(copyLibraryJS, reload));
  watch('./src/js/*.js', series(copyJS, reload));
  watch(
    [
      './src/images/**/*.png',
      './src/images/**/*.jpg',
      './src/images/**/*.gif',
      './src/images/**/*.svg',
    ],
    series(copyIMG, reload)
  );
  // watch('./src/images/decor/**/*.svg', series(copySVG, reload));
  // watch('./src/images/sprites/**/*.svg', series(copySprites, reload));
  watch('./src/fonts/**/*.*', copyFont, reload);

  done();
}

function reload(done) {
  browserSync.reload();

  done();
}

module.exports = {
  build: build(),
  start: series(build(), start),
};
