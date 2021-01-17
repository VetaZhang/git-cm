const preset = require('./preset');

const defaultConfig = {
  insertEmptyLine: true,
  inputList: [
    preset.type,
    preset.scope,
    preset.desc,
    preset.detail,
    preset.breaking,
    preset.issue,
  ],
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

module.exports = defaultConfig;