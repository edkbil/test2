import fileinclude from "gulp-file-include";
import gulpWebpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
  return (
    app.gulp
      .src(app.path.src.html)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(fileinclude()) //html
      // .pipe(
      //   pug({
      //     pretty: true,
      //     verbose: true,
      //   })
      // ) //pug
      .pipe(app.plugins.replace(/@img\//g, "img/"))
      // .pipe(gulpWebpHtmlNosvg())
      .pipe(app.plugins.if(app.isBuild, gulpWebpHtmlNosvg()))
      // .pipe(
      //   versionNumber({
      //     value: "%DT%",
      //     append: {
      //       key: "_v",
      //       cover: 0,
      //       to: ["css", "js"],
      //     },
      //     output: {
      //       file: "gulp/version.json",
      //     },
      //   })
      // )
      .pipe(
        app.plugins.if(
          app.isBuild,
          versionNumber({
            value: "%DT%",
            append: {
              key: "_v",
              cover: 0,
              to: ["css", "js"],
            },
            output: {
              file: "gulp/version.json",
            },
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
  );
};
