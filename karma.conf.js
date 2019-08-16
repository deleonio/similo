module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    files: ['*.bench.js'],
    frameworks: ['benchmark'],
    reporters: ['benchmark'],
    singleRun: true
  });
};
