
// const lang = 'cn';
const lang = 'en';

const typeOptionList = [
  {
    text: `💡 feature:  <label>`,
    value: '💡 feature',
    cn: '新增功能或特性',
    en: 'New feature'
  }, {
    text: `🐞 fix:      <label>`,
    value: '🐞 fix',
    cn: '修复 Bug',
    en: 'Fix bugs'
  }, {
    text: `📨 merge:    <label>`,
    value: '📨 merge',
    cn: '合并代码',
    en: 'Merge code'
  }, {
    text: `🔨 refactor: <label>`,
    value: '🔨 refactor',
    cn: '重构代码',
    en: 'Refactor code'
  }, {
    text: `🚀 perf:     <label>`,
    value: '🚀 perf',
    cn: '优化代码性能',
    en: 'Improve performance'
  }, {
    text: `📖 docs:     <label>`,
    value: '📖 docs',
    cn: '修改文档或注释',
    en: 'Modify documents'
  }, {
    text: `🔧 tool:     <label>`,
    value: '🔧 tool',
    cn: '修改辅助工具',
    en: 'Update tools'
  }, {
    text: `🔬 dev:      <label>`,
    value: '🔬 dev',
    cn: '修改开发环境配置',
    en: 'Modify dev config'
  }, {
    text: `🚧 ci:       <label>`,
    value: '🚧 ci',
    cn: '修改持续集成',
    en: 'Modify CI'
  }, {
    text: `🧪 test:     <label>`,
    value: '🧪 test',
    cn: '添加单元测试',
    en: 'Modify unit test'
  }, {
    text: `📦 release:  <label>`,
    value: '📦 release',
    cn: '创建可发布的提交',
    en: 'Generate release pkg'
  }, {
    text: `📝 format:   <label>`,
    value: '📝 format',
    cn: '修改代码风格',
    en: 'Format code style'
  }, {
    text: `🎨 style:    <label>`,
    value: '🎨 style',
    cn: '修改 CSS 样式',
    en: 'Modify CSS style'
  }
].map(item => {
  return {
    text: item.text.replace('<label>', item[lang]),
    value: item.value
  };
});

const scopeOptionList = [
  { cn: '用户', en: 'user' },
  { cn: '管理员', en: 'admin' },
  { cn: '配置', en: 'config' },
  { cn: '其他', en: 'other' },
].map(item => {
  return item[lang];
});

const questionList = [
  {
    name: 'type',
    question: {
      cn: '本次修改属于什么类型？',
      en: 'What is the type of this modification?'
    },
    type: 'select',
    optionList: typeOptionList
  },
  {
    name: 'scope',
    type: 'select',
    question: {
      cn: '本次修改涉及哪些业务模块？',
      en: 'What business modules are involved in this modification?'
    },
    optionList: scopeOptionList,
  },
  {
    name: 'desc',
    type: 'input',
    question: {
      cn: '本次修改的简单描述',
      en: 'Brief description of this modification'
    },
    validation: {
      minLength: 3,
      maxLength: 30,
    }
  },
  {
    name: 'detail',
    type: 'input',
    question: {
      cn: '本次修改的详细说明',
      en: 'Detailed description of this modification'
    },
    validation: {
      maxLength: 200,
    }
  },
].map(item => {
  return { ...item, question: item.question[lang] };
});

module.exports = {
  questionList,
  format({ type, scope, desc, detail }) {
    return `${type}(${scope}): ${desc}\n${detail}`;
  }
};