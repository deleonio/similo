module.exports = {
  'step one: navigate to google' : function (browser) {
    browser
      .url('https://www.vkb.de/content/versicherungen/haus-wohnen/hausratversicherung/abschliessen/')
      .waitForElementVisible('komposit', 1000)
      .setValue('input.input-day', '10')
      .setValue('input.input-month', '10')
      .setValue('input.input-year', '2019')
      .saveScreenshot('./reports/search-result.png')
      .pause(10000)
      .end();
  }
};
