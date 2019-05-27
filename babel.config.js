module.exports = {
  plugins: [
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-flow-strip-types'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        targets: {
          browsers: ['last 1 version', 'ie >= 11']
        },
        useBuiltIns: 'usage'
      }
    ]
  ],
  env: {
    test: {
      plugins: ['istanbul']
    }
  },
  sourceMaps: true,
  retainLines: true
};
