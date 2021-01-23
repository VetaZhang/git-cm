const { i18n } = require('./i18n');

const presetInput = {
  type: {
    key: 'type',
    type: 'select',
    question: i18n.question.type,
    optionList: [
      {
        label: `💡 feature:  ${i18n.optionsLabel.type.feature}`,
        value: '💡 feature',
      }, {
        label: `🐞 fix:      ${i18n.optionsLabel.type.fix}`,
        value: '🐞 fix',
      }, {
        label: `📨 merge:    ${i18n.optionsLabel.type.merge}`,
        value: '📨 merge',
      }, {
        label: `🔨 refactor: ${i18n.optionsLabel.type.refactor}`,
        value: '🔨 refactor',
      }, {
        label: `🚀 perf:     ${i18n.optionsLabel.type.perf}`,
        value: '🚀 perf',
      }, {
        label: `📖 docs:     ${i18n.optionsLabel.type.docs}`,
        value: '📖 docs',
      }, {
        label: `🔧 tool:     ${i18n.optionsLabel.type.tool}`,
        value: '🔧 tool',
      }, {
        label: `🔬 dev:      ${i18n.optionsLabel.type.dev}`,
        value: '🔬 dev',
      }, {
        label: `🚧 ci:       ${i18n.optionsLabel.type.ci}`,
        value: '🚧 ci',
      }, {
        label: `🧪 test:     ${i18n.optionsLabel.type.test}`,
        value: '🧪 test',
      }, {
        label: `📦 release:  ${i18n.optionsLabel.type.release}`,
        value: '📦 release',
      }, {
        label: `📝 format:   ${i18n.optionsLabel.type.format}`,
        value: '📝 format',
      }, {
        label: `🎨 style:    ${i18n.optionsLabel.type.style}`,
        value: '🎨 style',
      }
    ],
  },
  scope: {
    key: 'scope',
    type: 'input',
    question: i18n.question.scope,
    maxLength: 16,
    required: true,
  },
  desc: {
    key: 'desc',
    type: 'input',
    question: i18n.question.desc,
    maxLength: 32,
    required: true,
  },
  detail: {
    key: 'detail',
    type: 'input',
    question: i18n.question.detail,
    maxLength: 12,
  },
  breaking: {
    key: 'breaking',
    type: 'input',
    question: i18n.question.breaking,
    maxLength: 64,
  },
  issue: {
    key: 'issue',
    type: 'input',
    question: i18n.question.issue,
    maxLength: 12,
  }
};

module.exports = presetInput;