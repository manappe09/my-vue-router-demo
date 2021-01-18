// gulpプラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const prefix = require("gulp-autoprefixer");
// const imagemin = require('gulp-imagemin');
// const mozjpeg = require('imagemin-mozjpeg');
// const pngquant = require('imagemin-pngquant');

// タスクを作成する
gulp.task("default", gulp.series(gulp.parallel(styles, imgmin)));

function styles() {
  // ★ style.scssファイルを監視
  return gulp.watch(["assets/scss/*.scss", "assets/scss/partial/*/*.scss"], function() {
  // style.scssファイルを取得
  return (
    gulp
      .src("assets/scss/*.scss")
      .pipe(sassGlob())
      // Sassのコンパイルを実行
      .pipe(sass({outputStyle: 'expanded'}))
      // cssフォルダー以下に保存
      .pipe(prefix({
        cascade: false
      }))
      .pipe(gulp.dest("./dist/css"))
  );
  });
}

// image-min

// function imgmin() {
//   return gulp.watch('assets/img/*', function() {
//     return (
//     gulp
//     .src('assets/img/*')
//     .pipe(imagemin([
//       pngquant({
//         quality: [ 0.65, 0.8 ], speed: 1
//       }),
//       mozjpeg({
//         quality: 80
//       }),
//       imagemin.gifsicle({
//         interlaced: false
//       }),
//       imagemin.svgo({
//         plugins: [
//           { removeViewBox: true },
//           { cleanupIDs: false }
//         ]
//       }),
//     ]))
//     .pipe(gulp.dest('./dist/img'))
//   )
//   });
// }
