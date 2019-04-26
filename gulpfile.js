let gulp = require('gulp');

async function buildFeature(filename) {

  let
    rollup = require('rollup'),
    rollupPluginBabel = require('rollup-plugin-babel'),
    rollupPlugineEslint = require('rollup-plugin-eslint'),
    rollupPluginCommonjs = require('rollup-plugin-commonjs'),
    rollupPluginFilesize = require('rollup-plugin-filesize'),
    rollupPluginIncludepaths = require('rollup-plugin-includepaths'),
    rollupPluginNodeResolve = require('rollup-plugin-node-resolve'),
    rollupPluginProgress = require('rollup-plugin-progress'),
    // rollupPluginReplace = require('rollup-plugin-replace'),
    rollupPluginUglifyEs = require('rollup-plugin-uglify-es'),
    rollupPluginVisualizer = require('rollup-plugin-visualizer');

  const bundle = await rollup.rollup({
    input: 'src/' + filename + '.js',
    plugins: [
      rollupPlugineEslint(),
      // rollupPluginReplace({
      //   'process.env.NODE_ENV': '"production"'
      // }),
      rollupPluginIncludepaths({
        include: {},
        paths: ['src/'],
        external: [],
        extensions: ['.js', '.json', '.ts']
      }),
      rollupPluginBabel({
        "babelrc": false,
        "plugins": [
          "external-helpers",
          "syntax-flow",
          "transform-class-properties",
          "transform-flow-strip-types"
        ],
        "presets": [
          [
            "es2015",
            {
              "modules": false
            }
          ]
        ],
        sourceMaps: true
      }),
      rollupPluginNodeResolve({
        jsnext: true,
        module: true
      }),
      rollupPluginCommonjs({
        include: 'node_modules/**'
      }),
      rollupPluginUglifyEs(),
      rollupPluginProgress({
        clearLine: false
      }),
      rollupPluginFilesize(),
      rollupPluginVisualizer()
    ],
    treeshake: true
  });

  await bundle.write({
    exports: 'named',
    file: filename + '.js',
    format: 'es',
    sourcemap: true
  });

}

gulp.task('build', ['clean'], () => {
  buildFeature('angular');
  buildFeature('angularjs');
  buildFeature('index');
  buildFeature('vue');
});

gulp.task('clean', () => {

  var del = require('del');

  del.sync([
    './adapter/',
    './tmp/',
    './angular.js',
    './angularjs.js',
    './index.js',
    './vue.js',
    './*.amd.js',
    './*.cjs.js',
    './*.es.js',
    './*.iife.js',
    './*.js.map',
    './*.umd.js',
    './*.tgz'
  ]);

});
