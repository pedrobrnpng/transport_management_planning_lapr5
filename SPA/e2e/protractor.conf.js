// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/login.e2e-spec.ts',
    './src/**/app.e2e-spec.ts',
    './src/**/tipo-tripulante.e2e-spec.ts',
    './src/**/tipo-viatura.e2e-spec.ts',
    './src/**/no.e2e-spec.ts',
    './src/**/linha.e2e-spec.ts',
    './src/**/percurso.e2e-spec.ts',
    './src/**/tripulante.e2e-spec.ts',
    './src/**/viatura.e2e-spec.ts',
    './src/**/bloco-trabalho.e2e-spec.ts',
    './src/**/servico-tripulante.e2e-spec.ts',
    './src/**/servico-viatura.e2e-spec.ts',
    './src/**/viagem.e2e-spec.ts'

  ],
  multiCapabilities: [
    { 'browserName': 'chrome' }
  ],
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
  }
};
