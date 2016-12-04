import gulp from 'gulp';
import {config} from '../config';

gulp.task('binary', function() {
  return gulp.src(config.binary.src)
    .pipe(gulp.dest(config.binary.dest));
});
