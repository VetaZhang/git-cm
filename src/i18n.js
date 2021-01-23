
const setting = require('./setting.json');

const i18nConfig = {
  en: {
    question: {
      type: 'What type of the commit?',
      scope: 'Which part will be impacted by the commit?',
      desc: 'Input short description for the commit.',
      detail: 'Input modify detail for the commit.',
      breaking: 'What the breaking change of the commit?',
      issue: 'Which issue be closed by the commit?',
    },
    optionsLabel: {
      type: {
        feature: 'New feature',
        fix: 'Fix bugs',
        merge: 'Merge code',
        refactor: 'Refactor code',
        perf: 'Improve performance',
        docs: 'Modify documents',
        tool: 'Modify tools',
        dev: 'Modify dev config',
        ci: 'Modify CI',
        test: 'Modify unit test',
        release: 'Generate release pkg',
        format: 'Format code style',
        style: 'Modify CSS style',
      },
    },
    errorMsg: {
      required: '{name} is required!',
      maxLength: '{name} can not more than {maxLength}!',
    },
  },
  cn: {
    question: {
      type: '选择提交的类型',
      scope: '该提交修改了项目的哪部分代码？',
      desc: '添加该提交简短的说明',
      detail: '添加详细的描述',
      breaking: '有哪些破坏性的更改？',
      issue: '修复问题所关联的 issue？',
    },
    optionsLabel: {
      type: {
        feature: '新增功能或特性',
        fix: '修复 Bug',
        merge: '合并代码',
        refactor: '重构代码',
        perf: '优化代码性能',
        docs: '修改文档或注释',
        tool: '修改辅助工具',
        dev: '修改本地开发环境配置',
        ci: '修改持续集成',
        test: '添加单元测试',
        release: '创建可发布的提交',
        format: '修改代码风格',
        style: '修改 CSS 样式',
      },
    },
    errorMsg: {
      required: '必须填写 {name}！',
      maxLength: '{name} 长度不能超过 {maxLength}！',
    },
  }
};

const i18n = i18nConfig[setting.language] || i18nConfig.en;

function validateLang(lang) {
  return Object.keys(i18nConfig).includes(lang);
}

module.exports = {
  i18n,
  validateLang,
};