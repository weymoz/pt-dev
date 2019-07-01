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
const imageminMozjpeg = require('imagemin-mozjpeg');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
sass.compiler = require("node-sass");


function js() {
  return src('./src/js/*.js', {base: "src"})
    .pipe(babel())
    .pipe(dest("dist"))
    .pipe(uglify())
    .pipe(rename({extname: ".min.js"}))
    .pipe(dest('./peopletalk'))
    .pipe(dest("dist"))
    .pipe(dest('./docs'));
}

function watchJs(cb) {
  watch("./src/js/*.js", js);
  cb();
}


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
    './src/header-top.html', 
    './src/css-js-includes.html', 
    './src/header-bottom.html', 
    './src/content.html', 
    './src/form.html', 
    './src/footer.html'])
    .pipe(concat('index.html'))
    .pipe(dest('docs'))
    .pipe(dest('peopletalk'));
}

function watchHtml(cb) {
  watch('src/*.html', html);
  cb();
}


function htmlToDist() {
  return src([
    'src/content.html',
    'src/form.html',
  ])
  .pipe(concat('landing.html'))
  .pipe(dest('dist'))
}

function cssJsIncludesToDist() {
  return src([
    'src/css-js-includes.html',
  ])
  .pipe(dest('dist'))
}

function styles() {
  return src("src/scss/*.*")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(dest('dist'))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(sourcemaps.write())
    .pipe(rename({extname: ".min.css"}))
    .pipe(dest("docs"))
    .pipe(browserSync.stream())
    .pipe(dest('dist'))
    .pipe(dest('peopletalk'));
}

function watchStyles(cb) {
  watch("src/scss/*.*", styles);
  cb();
}

function optimizeImages() {
  return src("src/img/**/*.*", {base: "src"})
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      }),
    ], {verbose: true}))
    .pipe(imagemin(imageminMozjpeg({quality: 50})))
    .pipe(dest("docs"))
    .pipe(dest("dist"))
    .pipe(dest("peopletalk"));
}



function images() {
  return src("src/img/**/*.*", {base: "src"})
    .pipe(imagemin(imagemin.jpegtran()))
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
  return del(['peopletalk', 'docs', 'dist']);
}

function copySite() {
  return src("docs/**/*.*", {base: "docs"})
    .pipe(dest("dist/site"));
}


exports.dev = 
  series(clean, js, styles, html, images, copyServer, deploy,  
    parallel(watchStyles, watchHtml, watchJs, watchImages, serve, watchDeploy)
  );

exports.dev_loc = 
  series(clean, js, styles, html, images,  
    parallel(watchStyles, watchHtml, watchJs, watchImages, serve)
  );

exports.dist = 
  series(clean, styles, html, js, htmlToDist, cssJsIncludesToDist, optimizeImages, copySite, copyServer, deploy, parallel(serve));

exports.copySite = series(copySite);
