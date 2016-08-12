/**
 * Created by Artoria on 2016/8/2 0002.
 */
var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var cssmin= require('gulp-minify-css');

//sass编译
gulp.task('sass',function () {
    return rubySass('./src/sass/*.scss')
        .on('error',rubySass.logError)
        .pipe(gulp.dest('src/css'));
});

gulp.task('sassWacth',function () {
    gulp.watch('./src/sass/*.scss',function () {
        gulp.run('sass');
    })
});
gulp.task('jsmin',function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('cssmin',function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

//自动刷新页面
gulp.task('reloadPage',function () {
    browserSync({
        server: {
            //指定服务器启动根目录
            baseDir: "./"
        }
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("*.*").on('change', browserSync.reload);
});

//默认任务
gulp.task('default',function () {
    console.log("default");
});