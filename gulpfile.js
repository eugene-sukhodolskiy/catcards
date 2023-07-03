const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("sass-build", () => {
	return gulp.src("./client/styles/scss/index.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("all.min.css"))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./client/styles/css/"));
});

gulp.task("js-build", () => {
	return gulp.src("./client/js/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("all.min.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./client/js/dist"));
});

gulp.task("watch", () => {
	gulp.watch("./client/styles/scss/**/*.scss", gulp.series("sass-build"));
	gulp.watch("./client/js/*.js", gulp.series("js-build"));
});

