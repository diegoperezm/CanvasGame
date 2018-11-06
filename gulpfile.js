var gulp = require("gulp");
var prettier = require("gulp-prettier");
var useref = require("gulp-useref");

gulp.task("useref", function(done) {
  return gulp
    .src("src/*.html")
    .pipe(useref())
    .pipe(gulp.dest("public"));

  done();
});

gulp.task("prettier", function() {
  return gulp
    .src("./public/js/script.js")
    .pipe(prettier())
    .pipe(gulp.dest("./public/js"));
});

// Build Sequences
// ---------------

gulp.task("build", gulp.series("useref", "prettier"), function(done) {
  done();
});
