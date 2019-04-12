
	var gulp = require('gulp');
	var livereload = require('gulp-livereload');
    var sass = require('gulp-sass');
	var concat = require('gulp-concat');	
	var sftp = require('gulp-sftp');
	var typescript = require('gulp-tsc');

	/* ------------------------------------------------------------------------------------------ */
		
	gulp.task('reloadpublic', function() {

		return setTimeout(function() {
			livereload.reload();
		}, 100);
	});
	
	gulp.task('compilepublic', function() {

		gulp.src(['src/public/**/*.ts'])
			.pipe(typescript())
			.pipe(gulp.dest('public/'));
			
		return setTimeout(function() {
			livereload.reload();
		}, 5000);
	});

	gulp.task('compileserver', function() {

		gulp.src(['src/server/**/*.ts'])
			.pipe(typescript())
			.pipe(gulp.dest('dist/server/'));
			
		return setTimeout(function() {
			livereload.reload();
		}, 3000);
	});
 
	gulp.task('watch', function () {

		livereload.listen();

		gulp.watch([
			'src/server/**/*.ts'
		], ['compileserver']);

		gulp.watch([
			'src/public/**/*.ts'
		], ['compilepublic']);

		gulp.watch([
			'public/*.js',
			'public/styles.css',
			'public/index.html',
			'!public/ws.js',
		], ['reloadpublic']);
	});

	/* ------------------------------------------------------------------------------------------ */

	gulp.task('default', ['watch']);