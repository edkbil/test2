import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      // .src(app.path.src.scss, { soursemaps: true })
      .src(app.path.src.scss, { soursemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      // .pipe(groupCssMediaQueries())
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      // .pipe(
      //   webpcss({
      //     webpClass: ".webp",
      //     noWebpClass: ".no-wep",
      //   })
      // )
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: ".webp",
            noWebpClass: ".no-wep",
          })
        )
      )
      // .pipe(
      //   autoprefixer({
      //     grid: true,
      //     overrideBrowserlist: ["last 3 versions"],
      //     cascade: true,
      //   })
      // )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            overrideBrowserlist: ["last 3 versions"],
            cascade: true,
          })
        )
      )
      // .pipe(app.gulp.dest(app.path.build.css)) // if need same file without compresion
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
  );
};
