const gulp = require("gulp");
const sync = require("browser-sync").create();
const svgSprite = require('gulp-svg-sprite');

// Icons
const icons = () => {
  return gulp.src('src/img/*.svg')
      .pipe(svgSprite(
          {
              mode: {
                  symbol: {
                      sprite: 'symbol.svg',
                      dest: 'sprites',
                      bust: false
                  },
                  view: {
                      sprite: 'view.svg',
                      dest: 'sprites',
                      bust: false
                  },
                  css: {
                      sprite: 'css.svg',
                      dest: 'sprites',
                      bust: false
                  },
                  defs: {
                      sprite: 'defs.svg',
                      dest: 'sprites',
                      bust: false
                  },
                  stack: {
                      sprite: 'stack.svg',
                      dest: 'sprites',
                      bust: false
                  }
              }
          }
      ))
      .pipe(gulp.dest('src/img'));
};
exports.icons = icons;

const reload = done => {
  sync.reload();
  done();
};

// Server
const server = (done) => {
  sync.init({
    server: 'src'
  });
  done();
}
exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("src/img/*.svg", gulp.series(icons));
  gulp.watch("src/**/*.{html,css}", gulp.series(reload));
}

exports.default = gulp.series(
  icons, server, watcher
);
