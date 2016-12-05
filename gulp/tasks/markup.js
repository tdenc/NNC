import gulp from 'gulp';
import {config} from '../config';

gulp.task('markup', function() {
  return gulp.src(config.markup.src)
    .pipe(gulp.dest(config.markup.dest));
});
