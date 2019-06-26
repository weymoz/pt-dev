const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const { exec } = require("child_process");
const del = require("del");
const concat = require("gulp-concat");
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require("gulp-sass");
const imagemin = require('gulp-imagemin');
sass.compiler = require("node-sass");



function serve() {
  browserSync.init({
    server: {
      baseDir: "docs"
    },
    browser: "/usr/bin/google-chrome-stable"
  });

  browserSync.watch("docs/**/*.*").on("change", browserSync.reload);
}

function html() {
  return src([
    './src/header.html', 
    './src/content.html', 
    './src/footer.html'])
    .pipe(concat('index.html'))
    .pipe(dest('docs'))
    .pipe(dest('peopletalk'));
}

function watchHtml(cb) {
  watch('src/*.html', html);
  cb();
}


//function html() {
//  return src(['./src/index.html'])
//    .pipe(dest('docs'))
//    .pipe(dest('peopletalk'));
//}


//function watchHtml(cb) {
//  watch('src/index.html', html);
//  cb();
//}

function styles() {
  return src("src/scss/**/*.*")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemaps.write())
    .pipe(dest("docs"))
    .pipe(browserSync.stream())
    .pipe(dest('peopletalk'));
}

function watchStyles(cb) {
  watch("src/scss/**/*.*", styles);
  cb();
}

function images() {
  return src("src/img/*.*", {base: "src"})
    .pipe(imagemin(imagemin.jpegtran({progressive: true})))
    .pipe(dest("docs"))
    .pipe(dest("peopletalk"));
}


function watchImages(cb) {
  watch("src/img", images);
  cb();
}

function copyServer() {
  return src("server/*.*")
    .pipe(dest("peopletalk"));
}

function deploy(cb) {
  
  exec("./deploy.sh", (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
}

function watchDeploy(cb) {
  watch("peopletalk", deploy);
  cb();
}

function clean() {
  return del(['peopletalk', 'docs']);
}

exports.dev = 
    series(clean, styles, html, images, copyServer, deploy,  
    parallel(watchStyles, watchHtml, watchImages, serve, watchDeploy)
  );
