module.exports = {
  include: ['src/**/*.js'],
  exclude: [],
  all: true,
  cache: true,
  require: ['@babel/register'],
  watermarks: {
    lines: [50, 75],
    functions: [50, 75],
    branches: [50, 75],
    statements: [50, 75]
  },
  sourceMap: false,
  instrument: false
};
