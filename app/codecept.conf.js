const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './e2e/*.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://localhost:1234/',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'front-end'
}