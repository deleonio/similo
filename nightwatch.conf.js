module.exports = {
  src_folders: ['./test/e2e'],

  webdriver: {
    start_process: true
  },

  test_settings: {
    default: {
      webdriver: {
        server_path: 'node_modules\\.bin\\geckodriver.cmd',
        port: 4444,
        cli_args: ['--log', 'debug']
      },
      // filter: ['./test/e2e'],
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true
      }
    },

    chrome: {
      webdriver: {
        port: 9515,
        server_path: 'node_modules\\.bin\\chromedriver.cmd',
        cli_args: ['--verbose']
      },

      desiredCapabilities: {
        browserName: 'chrome',
        loggingPrefs: { driver: 'INFO', server: 'OFF', browser: 'INFO' }
      }
    },

    selenium: {
      selenium: {
        start_process: true,
        host: 'localhost',
        server_path: 'selenium-server-standalone-3.141.59.jar',
        cli_args: {
          'webdriver.gecko.driver': 'node_modules\\.bin\\geckodriver.cmd',
          'webdriver.chrome.driver': 'node_modules\\.bin\\chromedriver.cmd'
        }
      },

      desiredCapabilities: {
        browserName: 'firefox',
        acceptSslCerts: true
      }
    }
  }
};
