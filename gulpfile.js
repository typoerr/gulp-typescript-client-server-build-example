const gulp = require('gulp')
const ts = require('gulp-typescript')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./client/webpack.config.js')

const serverTsProject = ts.createProject('./server/tsconfig.json')

const compileServerTs = () => {
  return gulp
    .src('./server/src/**/*.ts')
    .pipe(serverTsProject())
    .pipe(gulp.dest('dist/server'))
}

const compileClientTs = () => {
  return gulp
    .src('./client/src/**/*.ts')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist/client'))
}

const clean = done => {
  return del(['./dist'], done)
}

const compile = gulp.parallel(compileClientTs, compileServerTs)

/* ------------------------------------------------------ */
/*                      Register Task                     */
/* ------------------------------------------------------ */
exports['compile'] = compile
exports['compile:watch'] = () => {
  return gulp.watch('./(server|client)/src/**/*.ts', { ignoreInitial: false }, compile)
}

exports.clean = clean
