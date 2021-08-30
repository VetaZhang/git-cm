const preset = require('./preset');

const defaultConfig = {
  dev: false,
  lang: 'en',
  insertEmptyLine: false,
  preset: [
    'type',
    'scope',
    'desc',
    'detail',
    'breaking',
    'issue',
  ],
  // inputList: [
  //   preset.type,
  //   preset.scope,
  //   preset.desc,
  //   preset.detail,
  //   preset.breaking,
  //   preset.issue,
  // ],
  onConfig(config) {
    const { type, scope, desc, detail, breaking, issue } = config;
    return [
      `${type}${scope ? `(${scope})` : ''}: ${desc}`,
      `${detail}`,
      `${breaking}`,
      `${issue}`,
    ];
  }
};

function checkConfig(config) {
  //
}

function readConfig() {
  const currDir = process.cwd();
  const customConfig = require(`${currDir}/gitcm.config.js`);
  const config = {
    ...defaultConfig,
    ...customConfig,
  };

  if (config.inputList) {
    
  } else if (config.preset) {
    
  }
}

module.exports = defaultConfig;