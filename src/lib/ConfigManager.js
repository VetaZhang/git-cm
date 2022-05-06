const path = require('path')
const fs = require('fs')
const { i18n } = require('../i18n');

const presetInput = {
  type: {
    name: 'type',
    type: 'select',
    question: i18n.question.type,
    optionList: [
      {
        text: `💡 feature:  ${i18n.optionsLabel.type.feature}`,
        value: '💡 feature',
      }, {
        text: `🐞 fix:      ${i18n.optionsLabel.type.fix}`,
        value: '🐞 fix',
      }, {
        text: `📨 merge:    ${i18n.optionsLabel.type.merge}`,
        value: '📨 merge',
      }, {
        text: `🔨 refactor: ${i18n.optionsLabel.type.refactor}`,
        value: '🔨 refactor',
      }, {
        text: `🚀 perf:     ${i18n.optionsLabel.type.perf}`,
        value: '🚀 perf',
      }, {
        text: `📖 docs:     ${i18n.optionsLabel.type.docs}`,
        value: '📖 docs',
      }, {
        text: `🔧 tool:     ${i18n.optionsLabel.type.tool}`,
        value: '🔧 tool',
      }, {
        text: `🔬 dev:      ${i18n.optionsLabel.type.dev}`,
        value: '🔬 dev',
      }, {
        text: `🚧 ci:       ${i18n.optionsLabel.type.ci}`,
        value: '🚧 ci',
      }, {
        text: `🧪 test:     ${i18n.optionsLabel.type.test}`,
        value: '🧪 test',
      }, {
        text: `📦 release:  ${i18n.optionsLabel.type.release}`,
        value: '📦 release',
      }, {
        text: `📝 format:   ${i18n.optionsLabel.type.format}`,
        value: '📝 format',
      }, {
        text: `🎨 style:    ${i18n.optionsLabel.type.style}`,
        value: '🎨 style',
      }
    ],
    validation: {
      required: true,
      multiSelect: false,
    }
  },
  scope: {
    name: 'scope',
    type: 'input',
    question: i18n.question.scope,
    defaultValue: '',
    template: '(<scope>)',
    validation: {
      maxLength: 20,
    }
  },
  desc: {
    name: 'desc',
    type: 'input',
    question: i18n.question.desc,
    validation: {
      maxLength: 50,
      required: true,
    }
  },
  detail: {
    name: 'detail',
    type: 'input',
    question: i18n.question.detail,
    defaultValue: '',
    validation: {
      maxLength: 200,
    }
  },
};

function getParentPath(childPath) {
  return path.resolve(childPath, '..');
}

function isExist(filepath) {
  let stat;
  try {
    stat = fs.statSync(filepath, () => {});
  } catch (error) {
    //
  }
  return !!stat;
}

class ConfigManager {
  constructor() {
    this.config = {};
    this.configFileName = 'gitcm.config.json';
    this.configPath = process.cwd();
  }

  getSearchConfigPath(path) {
    return path + '/' + this.configFileName;
  }

  getDefaultConfigByType(type) {
    if (!presetInput[type]) {
      throw Error(`Preset '${type}' is not exist.`);
    }
    return presetInput[type];
  }

  getDefaultConfig() {
    return {
      inputList: [
        presetInput.type,
        presetInput.scope,
        presetInput.desc,
        presetInput.detail,
      ],
      template: '<type><scope>: <desc>\n<detail>',
    };
  }

  getCustomConfig() {
    let path = this.configPath;
    while (path !== '/') {
      const configPath = this.getSearchConfigPath(path);
      if (isExist(configPath)) {
        const customConfigBuffer = fs.readFileSync(configPath);
        const customConfig = JSON.parse(customConfigBuffer.toString());
        if (!Array.isArray(customConfig.inputList)) {
          throw Error('config.inputList is not a array.');
        }
        customConfig.inputList = customConfig.inputList.map(configItem => {
          if (typeof configItem === 'string') {
            return this.getDefaultConfigByType(configItem);
          }
          return configItem;
        });
        return customConfig;
      }
      path = getParentPath(path);
    }
    return null;
  }

  getConfig() {
    return this.getCustomConfig() || this.getDefaultConfig();
  }
}

module.exports = new ConfigManager();