const {src,dest,series,watch} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefixer = require('autoprefixer');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');



//scss Task
const scssTask = function () {
    return src('./static/scss/*.scss')
    .pipe(scss())
    .pipe(sourcemaps.init())
    .pipe(postcss([prefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./static/css/'))
};
    


//JS task
const jsTask = function () {
    return src('/static/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('/static/minjs/'))
};



//watch Task
const watchTask = function () {
    watch('./static/scss/*.scss', scssTask);
    watch('./static/js/*.js', jsTask);
};



exports.default = series (
    scssTask,
    jsTask,
    watchTask
);
