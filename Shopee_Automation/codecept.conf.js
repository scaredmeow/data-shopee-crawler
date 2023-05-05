const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_auto.js',
  output: './Documentations',
  helpers: {
    Puppeteer: {
      url: 'https://shopee.ph',
      show: true,
      windowSize: '1920x1080',
      restart: 'true'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'Shopee_Automation'
}