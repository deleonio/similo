module.exports = {
  src_folders: ['./test/e2e'],
  output_folder: './test/e2e/reports',
  webdriver: {
    start_process: true
  },
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
      launch_url: 'https://www.google.com',
      webdriver: {
        server_path: 'node_modules\\.bin\\chromedriver.cmd',
        cli_args: ['--verbose'],
        port: 9515
      },
      desiredCapabilities: {
        browserName: 'chrome',
        loggingPrefs: {
          driver: 'INFO',
          server: 'OFF',
          browser: 'INFO'
        }
      }
    },
    firefox: {
      launch_url: 'https://www.yahoo.com',
      webdriver: {
        server_path: 'node_modules\\.bin\\geckodriver.cmd',
        port: 4444
      },
      // filter: ['./test/e2e'],
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
        server_path: 'selenium-server-standalone-3.141.59.jar',
        cli_args: {
          'webdriver.chrome.driver': 'node_modules\\.bin\\chromedriver.cmd',
          'webdriver.edge.driver': 'msedgedriver.exe',
          'webdriver.gecko.driver': 'node_modules\\.bin\\geckodriver.cmd',
          'webdriver.ie.driver': 'IEDriverServer.exe'
        }
      },
      desiredCapabilities: {
        browserName: 'chrome',
        loggingPrefs: { driver: 'INFO', server: 'OFF', browser: 'INFO' }
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
