var gulp = require('gulp');
    sass = require('gulp-sass');
    concat = require('gulp-concat');
    csso = require('gulp-csso');
    autoprefixer = require('gulp-autoprefixer');
    uglify = require('gulp-uglify');
    imagemin = require('gulp-imagemin');
    watch = require('gulp-watch');
    sourcemaps = require('gulp-sourcemaps');
    gcmq = require('gulp-group-css-media-queries');
    browserSync = require('browser-sync').create();

var path = {
    dst: {
        dist: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/images',
        fonts: 'dist/fonts'
    },
    cssSrc: 'src/css',
    src: 'src',
    css: [
        'src/css/reset.css',
        'src/css/**/*.css'
    ],
    sass: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/images/**/*',
    fonts: 'src/fonts/**/*'
};

gulp.task('fonts', function(){
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.dst.fonts))
});

gulp.task('css', ['sass'], function(){
    return gulp.src(path.css)
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(csso())
        .pipe(concat('all.css'))
        .pipe(gulp.dest(path.dst.css))
        .pipe(browserSync.stream());
});

gulp.task('sass', function(){
    return gulp.src(path.sass)
        .pipe(sass())
        .pipe(gulp.dest(path.cssSrc))
});

gulp.task('js', function(){
    return gulp.src(path.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dst.js))
        .pipe(browserSync.stream());
});

gulp.task('images', function(){
    return gulp.src(path.img)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dst.img))
});

gulp.task('watch', ['build'], function(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8000,
        open: true
    });

    watch(path.sass, function(){
        gulp.start('css');
    });

    watch(path.js, function(){
        gulp.start('js');
    });

    watch(path.img, function(){
        gulp.start('images');
    });

    watch('*.html', function(){
        browserSync.reload();
    });
});

gulp.task('build', function(){
    return gulp.start('js', 'css', 'images', 'fonts');
})
