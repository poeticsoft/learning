
	var gulp = require('gulp');
	var livereload = require('gulp-livereload');
	var ts = require('gulp-typescript');	
	var tsProject = ts.createProject('tsconfig.json');

	/* ------------------------------------------------------------------------------------------ */	

	gulp.task('compile', function () {

		return gulp .src('src/main.ts') 
                .pipe(tsProject())
                .pipe(gulp.dest('dist'));
	});

	gulp.task('reload', [ 'compile' ], function() {

		setTimeout(livereload.reload, 200);
	});

	gulp.task('watch', function () {

		livereload.listen();

	    gulp.watch(
	    	[
				  'src/**/*.ts',
	    	], 
	    	[
	    		'reload'
	    	]
	    );
	});

	/* ------------------------------------------------------------------------------------------ */

	gulp.task('default', ['watch']);