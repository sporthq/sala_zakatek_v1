const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const sortMediaQueries = require('postcss-sort-media-queries');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const sourcemaps = require('gulp-sourcemaps');



const paths = {
	css: './src/css/*.css',
	js: './src/js/*.js',
	img: './src/img/**/*',
	dist: './dist',
	cssDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
};

function gulpCompile(done) {
	src(paths.css)
		.pipe(sourcemaps.init())
		.pipe(concat('style.css'))
		.pipe(cssnano())
		.pipe(postcss([sortMediaQueries(), autoprefixer()]))
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.cssDest));

	done();
}

function jsCompile(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.jsDest));
	done();
}
function convertImg(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	done();
}


function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean());

	done();
}


const mainFn = parallel(gulpCompile, jsCompile, convertImg);
exports.cleanStuff = cleanStuff; 
exports.default = series(mainFn);

