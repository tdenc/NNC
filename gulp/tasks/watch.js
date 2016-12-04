import gulp from 'gulp';
import {config} from '../config';

gulp.task('watch_markup', function() {
  gulp.watch(config.markup.src, ['markup']);
});

gulp.task('watch_js', function() {
  gulp.watch(config.babel.src, ['babel']);
});
