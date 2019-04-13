
	var gulp = require('gulp');
	var livereload = require('gulp-livereload');
	var ts = require('gulp-typescript');
	var concat = require('gulp-concat');

	/* ------------------------------------------------------------------------------------------ */
	
	gulp.task('update_upload', ['compile_upload'], function() {

		gulp.src('./angularjs/kendo/upload/dist/**/*')
		.pipe(gulp.dest('P:/sonandcalm/www.sonandcalm.com/wp-content/plugins/poeticsoft-utils/'));		

		setTimeout(livereload.reload, 500);
	});

	gulp.task('compile_upload', function() {

		// css

		gulp.src([
			'./angularjs/kendo/bower_components/kendo-ui/styles/kendo.common.min.css',
			'./angularjs/kendo/bower_components/kendo-ui/styles/kendo.metro.min.css',
			'./angularjs/kendo/bower_components/kendo-ui/styles/kendo.metro.mobile.min.css',
			'./angularjs/kendo/upload/app.css'
		])
		.pipe(concat('utils.css'))
		.pipe(gulp.dest('./angularjs/kendo/upload/dist/'));			

		// Javascript

		gulp.src([
			'./angularjs/kendo/bower_components/kendo-ui/js/jquery.min.js',
			'./angularjs/kendo/bower_components/kendo-ui/js/angular.min.js',
			'./angularjs/kendo/bower_components/kendo-ui/js/kendo.all.min.js',
			'./angularjs/kendo/upload/app.js'
		])
		.pipe(concat('utils.js'))
		.pipe(gulp.dest('./angularjs/kendo/upload/dist/'));			

		// Files

		gulp.src([
			'./angularjs/kendo/bower_components/kendo-ui/styles/images/kendoui.woff'
		])
		.pipe(gulp.dest('./angularjs/kendo/upload/dist/images/'));

		gulp.src([
			'./angularjs/kendo/bower_components/kendo-ui/styles/Metro/loading-image.gif',
			'./angularjs/kendo/bower_components/kendo-ui/styles/Metro/loading.gif'
		])
		.pipe(gulp.dest('./angularjs/kendo/upload/dist/Metro/'));

		gulp.src([
			'./angularjs/kendo/bower_components/kendo-ui/styles/fonts/glyphs/WebComponentsIcons.ttf',
			'./angularjs/kendo/bower_components/kendo-ui/styles/fonts/glyphs/WebComponentsIcons.woff'
		])
		.pipe(gulp.dest('./angularjs/kendo/upload/dist/fonts/glyphs/'));

	    return;
	});
	
	gulp.task('tsc', function() {

	    return  gulp.src('typescript/a/src/**/*.ts')
					.pipe(
						ts(
							{
								noImplicitAny: true,
        						experimentalDecorators: true,
								outFile: 'main.js'
							}
						)
					)
					.pipe(gulp.dest('typescript/a/dist'));
	});

	gulp.task('reload', function() {

		setTimeout(livereload.reload, 500);
	});

	gulp.task('watch', function () {

		livereload.listen();

	    gulp.watch(
	    	[
				'angularjs/kendo/upload/**/*',
				'!angularjs/kendo/upload/dist/**/*',
	    	], 
	    	[
	    		'update_upload'
	    	]
	    );
	});

	/* ------------------------------------------------------------------------------------------ */

	gulp.task('default', ['watch']);