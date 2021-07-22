const { src, dest, watch, parallel } = require('gulp');

const scss 				= require('gulp-sass');
const concat 			= require('gulp-concat');
const browserSync 	= require('browser-sync').create();
const autoprefixer	= require('gulp-autoprefixer');
const imagemin			= require('gulp-imagemin');

function browsersync() {
	browserSync.init({
		server : {
			baseDir: 'app/'
		}
	});
}

function images() {
	return src('app/images/**/*')
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			 plugins: [
				  {removeViewBox: true},
				  {cleanupIDs: false}
			 ]
		})
  ]))
	.pipe(dest('dist/images'))
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(scss({outputStyle: 'expanded'}))
		// .pipe(concat('style.min.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}


function build() {
	return src([
		'app/css/style.css',
		'app/fonts/**/*',
		'app/js/main.js',
		'app/*.html'
	], {base: 'app'})
	.pipe(dest('dist'))
}


function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = build;
exports.images = images;

exports.default = parallel(browsersync, watching);


