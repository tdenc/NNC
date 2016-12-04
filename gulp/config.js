const dest = './build', src = './src';

export const config = {
  browserSync: {
    server: {
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  markup: {
    src: [src + '/html/**', src + '/css/**'],
    dest: dest
  },
  babel: {
    src: [src + '/js/**'],
    base: src + '/js/',
    dest: dest,
    presets: ["es2015", "react", "stage-0"]
  },
  binary: {
    src: './lib/mediainfo/bin/mediainfo-*',
    dest: dest
  }
};
