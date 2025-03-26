import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';

export const svgSpriteTask = () => {
	return gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(plumber({
			errorHandler: notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			})
		}))
		.pipe(cheerio({
			run: ($) => {
				$('[fill]').removeAttr('fill');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					example: true  // Создать страницу с перечнем иконок
				}
			}
		}))
		.pipe(gulp.dest(`${app.path.build.images}`));
};