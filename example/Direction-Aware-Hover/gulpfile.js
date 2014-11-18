﻿/**
 * @author myqianlan
 * @date 2014年11月6日12:58:32
 */
// 包含gulp   
var gulp = require('gulp');

// 包含插件   

// sass 编译
var sass = require('gulp-ruby-sass');
// 合并

// 自动加CSS浏览器前缀
var autoprefixer = require('gulp-autoprefixer');

// Server
var http = require('http');
var connect = require('connect');
var open = require('open');

// Server Settings
var root = './app';
var port = 3000;
var host = 'localhost';
var protocol = 'http';

gulp.task('server', function() {
    var app = connect().use(connect.static(root));

    http.createServer(app).listen(port);
    open(protocol + '://' + host + ':' + port + '/index.html');
});


// Compile SASS  

gulp.task('sass', function() {
    gulp.src(root + '/scss/**/*.scss')
        .pipe(sass({
            sourcemap: "file",
            sourcemapPath: '../scss',
            noCache: true,
        }))
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest(root + '/css'));
});

// 自动添加浏览器前缀 
// By default, Autoprefixer uses > 1%, last 2 versions, Firefox ESR, Opera 12.1
gulp.task('autoprefixer', function() {
    gulp.src(root + '/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(root + '/css'));
});

// 默认任务   
gulp.task('default', ['sdev']);

// 开发任务
gulp.task('sdev', ['sass', 'server'], function() {

    // 监视scss文件的变化,并且执行sass
    // 如果scss文件夹为空，任务可能会中断
    gulp.watch(root + '/scss/**/*.scss', ['sass']);
});
// 不带本地服务器
gulp.task('dev', ['sass'], function() {

    // 监视scss文件的变化,并且执行sass
    // 如果scss文件夹为空，任务可能会中断
    gulp.watch(root + '/scss/**/*.scss', ['sass']);
});