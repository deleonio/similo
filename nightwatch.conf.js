const TEST_URL = `https://www.google.com`;
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const seleniumServerStandalone = require('selenium-server-standalone-jar');

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
  // test_runner: {
  //   type: 'mocha',
  //   options: {
  //     ui: 'bdd',
  //     reporter: 'list'
  //   }
  // },
  test_workers: {
    enabled: true,
    workers: 'auto'
  },
  test_settings: {
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        cli_args: ['--verbose'],
        port: 9515
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--incognito', '--no-sandbox']
        }
      }
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
        cli_args: ['--verbose'],
        port: 4444
      },
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true
      }
    },
    // currently unsupported only in grid
    // edge: {
    //   webdriver: {
    //     server_path: './msedgedriver.exe',
    //     port: 9515
    //   },
    //   desiredCapabilities: {
    //     browserName: 'microsoftedge'
    //   }
    // },
    // currently unsupported only in grid
    // ie: {
    //   webdriver: {
    //     server_path: 'IEDriverServer.exe',
    //     port: 5555
    //   },
    //   desiredCapabilities: {
    //     browserName: 'internet explorer'
    //   }
    // },
    selenium: {
      selenium: {
        start_process: true,
        host: 'localhost',
        server_path: seleniumServerStandalone.path,
        port: 4444,
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path,
          'webdriver.edge.driver': 'msedgedriver.exe',
          'webdriver.gecko.driver': geckodriver.path,
          'webdriver.ie.driver': 'IEDriverServer.exe'
        }
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--incognito', '--no-sandbox']
        }
        // browserName: 'firefox'
        // browserName: 'MicrosoftEdge'
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
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
};
