// Rollup-Plugins
// import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import includepaths from 'rollup-plugin-includepaths';
import minimist from 'minimist';
import nodeResolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
// import replace from 'rollup-plugin-replace';
// import uglify from 'rollup-plugin-uglify';
import uglifyEs from 'rollup-plugin-uglify-es';
import visualizer from 'rollup-plugin-visualizer';

// Rollup-Konfiguration
export default {
  dest: minimist(process.argv).output,
  exports: 'named',
  format: 'es',
  plugins: [
    eslint(),
    // replace({
    //   'process.env.NODE_ENV': '"production"'
    // }),
    includepaths({
      include: {},
      paths: ['src/'],
      external: [],
      extensions: ['.js', '.json', '.ts']
    }),
    babel({
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
    nodeResolve({
      jsnext: true,
      module: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    uglifyEs(),
    progress({
      clearLine: false
    }),
    filesize(),
    visualizer()
  ],
  sourceMap: true,
  treeshake: true
};
