module.exports = {
  plugins: [
    // [
    //   '@babel/plugin-proposal-decorators',
    //   {
    //     legacy: true
    //   }
    // ],
    // [
    //   '@babel/plugin-proposal-private-methods',
    //   {
    //     loose: true
    //   }
    // ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ],
  presets: ["@babel/preset-flow"],
  env: {
    test: {
      plugins: ['istanbul']
    }
  },
  sourceMaps: true,
  retainLines: true
};
