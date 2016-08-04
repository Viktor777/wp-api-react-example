process.env.NODE_ENV = 'production';

let gulp = require('gulp');
let babelify = require('babelify');
let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let source = require('vinyl-source-stream');
let stripDebug = require('gulp-strip-debug');
let uglify = require('gulp-uglify');
let uglifyify = require('uglifyify');
let watchify = require('watchify');
let bundle = env => {
    let dev = env === 'development';
    let entry = 'index';
    let bundler = browserify({
        entries: `./app/${entry}.jsx`,
        extensions: ['.js', '.jsx'],
        debug: dev,
        cache: {},
        packageCache: {},
        plugin: dev ? [watchify] : null
    }).transform(babelify, {
        presets: ['es2015', 'react'],
        plugins: ['transform-export-extensions']
    });
    let rebundle;

    if (!dev) {
        bundler = bundler.transform(uglifyify);
    }
    rebundle = () => {
        let result = bundler
            .bundle()
            .on('error', console.log.bind(console, 'Browserify Error'))
            .pipe(source(`${entry}${!dev ? '.min' : ''}.js`))
            .pipe(buffer());

        if (!dev) {
            result = result
                .pipe(stripDebug())
                .pipe(uglify());
        }

        return result
            .pipe(gulp.dest('./build/scripts'));
    };

    bundler
        .on('update', () => {
            console.time(`Rebundle: ${entry}`);
            rebundle()
                .on('end', () => console.timeEnd(`Rebundle: ${entry}`));
        })
        .on('log', console.log);

    return rebundle();
};
gulp.task('js:dev', bundle.bind(null, 'development'));
gulp.task('js:prod', bundle.bind(null, 'production'));
gulp.task('js', ['js:prod', 'js:dev']);
gulp.task('default', ['js:dev']);
gulp.task('pre-commit', ['js:prod']);