var gulp = require ( 'gulp' );
var connect = require ( 'gulp-connect' );
var jshint = require ( 'gulp-jshint' );

gulp.task('connect', function(){

  connect.server({
    root:'.',
    livereload:true
  });

});

// html task
// specify where our HTML files are
// and reload when they're saved

gulp.task( 'html', function(){

  gulp.src( './*.html' ).pipe( connect.reload() );

});

// css task
// specify where our HTML files are
// and reload when they're saved

gulp.task( 'css', function(){

  gulp.src( './css/main.css' ).pipe( connect.reload() );

});

// JS hint task
// specify where our JS files are
// and do LINTING

gulp.task( 'jshint', function(){

  gulp.src( './js/*.js' ).pipe( jshint() ).pipe( jshint.reporter('default') );

});

// watch task
//specify where certain files are
//and the task to run when they change

gulp.task( 'watch', function(){

  gulp.watch( ['./*.html'],['html'] );
  gulp.watch( ['./css/main.css'],['css'] );
  gulp.watch( ['./js/*.js'],['jshint'] );

});

gulp.task( 'default', ['connect', 'watch'] );
