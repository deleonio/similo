const TEST_URL = `https://www.google.com`;
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const seleniumServerStandalone = require('selenium-server-standalone-jar');

const DESIRED_CAPABILITIES_CHROME = {
  browserName: 'chrome',
  javascriptEnabled: true,
  acceptSslCerts: true,
  chromeOptions: {
    args: ['--incognito', '--no-sandbox'],
    w3c: false
  }
};
const DESIRED_CAPABILITIES_FIREFOX = {
  browserName: 'firefox',
  javascriptEnabled: true,
  acceptSslCerts: true
};

module.exports = {
  src_folders: ['./test/e2e'],
  output_folder: './test/e2e/reports',
  globals_path: './nightwatch.global.js',
  webdriver: {
    start_process: true
  },
  launch_url: TEST_URL,
  screenshots: {
    enabled: true,
    on_failure: true,
    on_error: false,
    path: './test/e2e/reports'
  },
  test_workers: {
    enabled: true,
    workers: 'auto'
  },
  test_settings: {
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--verbose'],
        port: 9515,
        use_lagacy_jsonwire: false
      },
      desiredCapabilities: DESIRED_CAPABILITIES_CHROME
    },
    selenium: {
      selenium: {
        start_process: true,
        host: 'localhost',
        server_path: seleniumServerStandalone.path,
        port: 4444,
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
          'webdriver.gecko.driver': geckodriver.path,
        }
      },
      // desiredCapabilities: DESIRED_CAPABILITIES_CHROME
      // desiredCapabilities: DESIRED_CAPABILITIES_FIREFOX,
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        acceptSslCerts: true
      }
    },
    seleniumGrid: {
      webdriver: {
        start_process: false
      },
      selenium: {
        start_process: false,
        host: 'selenium-grid.modevel.de',
        port: 4444
      },
      // desiredCapabilities: DESIRED_CAPABILITIES_CHROME
      desiredCapabilities: DESIRED_CAPABILITIES_FIREFOX
    }
  }
};
