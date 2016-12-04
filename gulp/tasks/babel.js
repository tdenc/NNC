import gulp from "gulp";
import babel from "gulp-babel";
import {config} from '../config';

gulp.task('babel', function() {
  return gulp.src(config.babel.src, {base: config.babel.base})
    .pipe(babel({presets: config.babel.presets}))
    .pipe(gulp.dest(config.markup.dest));
});
