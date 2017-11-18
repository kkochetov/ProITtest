exports.config = {
    // Server Configurations
    host: process.env.seleniumHub || 'localhost',
    port: 4444,
    path: '/wd/hub',
    
    // Specify Test Files
    specs: [
        './features/**/*.feature'
    ],

    // Capabilities
    maxInstances: 10,
    capabilities: [{
        maxInstances: 1,
        browserName: process.env.browserName || 'chrome',
        chromeOptions: {
             prefs: {
                "download.default_directory": process.cwd() + '\\download',
            }
        }
    }],

    // Test Configurations
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    deprecationWarnings: false,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    // Test runner services
    framework: 'cucumber',
    reporters: ['dot','allure'],
    cucumberOpts: {
        require: ['./features/step_definitions/steps.js'],
        backtrace: false,
        compiler: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tags: [],
        timeout: 50000,
        ignoreUndefinedDefinitions: false,
    },
    
    // Hooks
    before: function (capabilities, specs) {
        browser.windowHandleSize({width:1280,height:720});
     },
     
    //Делать скриншот после упавших шагов.
    afterStep: function (stepResult) {
    var fs = require('fs');
    var dir = './errorShots/';
    if (stepResult.status == 'failed'){
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        browser.saveScreenshot(dir + Date.now() + '.png');
     } 
   }
}
