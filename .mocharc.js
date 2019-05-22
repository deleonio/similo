module.exports = {
  diff: true,
  spec: 'test/**/*.spec.js',
  extension: ['js'],
  // opts: './test/mocha.opts',
  package: './package.json',
  reporter: 'spec',
  require: [
    '@babel/register',
    'jsdom-global/register',
    'esm'
  ],
  slow: 75,
  timeout: 2000,
  ui: 'bdd'
};

/**
 * Es gibt auch die Möglichkeit die Konfiguration mittels
 * Opts vorzunehmen. Allerdings genügt uns diese Form der
 * Konfiguration.
 *
 * Link: https://mochajs.org/#mochaopts
 */

/**
 * Coverage mit nyc
 *
 * Reporter: https://istanbul.js.org/docs/advanced/alternative-reporters/
 */
