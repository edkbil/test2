import webpack from "webpack-stream";

export const js = () => {
  return (
    app.gulp
      // .src(app.path.src.js, { soursemaps: true })
      .src(app.path.src.js, { soursemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        webpack({
          //   mode: "development",
          mode: app.isDev ? "production" : "development",
          output: {
            filename: "app.min.js",
          },
        })
      )
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream())
  );
};
