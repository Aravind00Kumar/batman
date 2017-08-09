var path = require('path');

let suites = { 
  e2e2: "./tests/e2e/**/*spec.js" 
};

exports.config = {
    framework: 'jasmine',
    /**
     *  setting up protractor to start webdriver manger automatically
     */
    seleniumServerJar: path.join(__dirname, "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar"),
    chromeDriver: path.join(__dirname, "node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.31.exe"),
    seleniumPort: 4444,

    /**
     *  Enable this to start webdriver manually
     *  `webdriver start node_modules/.bin/webdriver-manager start` is the command to start webdriver manual
     */
     //seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: suites,
    onPrepare: function () {
        var caps = browser.getCapabilities()
    },
    capabilities: {
        'browserName': 'chrome',
    /**
     * Enable it to run chrome in headless mode like PhantomJS    
     */ 
    // chromeOptions: {
    //      args: [ "--headless", "--disable-gpu", "--window-size=800x600" ]
    // }
    },
    allScriptsTimeout: 999999,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 999999
    },
};