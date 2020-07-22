// 'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const minify = require("gulp-babel-minify");
// const { watch } = require('gulp');

function style() {
    return gulp.src('./static/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./static/css'))

}

function watch() {
    gulp.watch('./static/css/**/*.scss', style);
}


const buildjs = [
    //test
    () => {
        return gulp.src('./static/js/main.dev.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename("main.test.js"))
        .pipe(gulp.dest('./static/js'))
    },

    //prod
    () => {
        return gulp.src('./static/js/main.dev.js')
        .pipe(minify())
        .pipe(rename("main.prod.js"))
        .pipe(gulp.dest('./static/js'))
    }
];

const deploy = [
    () => {
        return gulp.src('./index.html')
            .pipe(gulp.dest('../py/templates'));
    },

    () => {
        return gulp.src('./static/css/*.css')
            .pipe(gulp.dest('../py/static/css'));
    },

    () => {
        return gulp.src('./static/js/*.js')
            .pipe(gulp.dest('../py/static/js'));
    },

    () => {
        return gulp.src('./static/src/*')
            .pipe(gulp.dest('../py/static/src'));
    }
];


exports.style = style;
exports.watch = watch;

exports.deploy = gulp.series(...buildjs, ...deploy);