module.exports = {
  plugins: [
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    '@babel/plugin-transform-flow-strip-types'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'entry'
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
