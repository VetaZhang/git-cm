
const defaultConfig = {
  emptyLineBetweenLines: true,
  inputList: [
    {
      key: 'type',
      type: 'select',
      question: {
        msg: 'What type of the commit?',
        prefix: '',
        suffix: '',
      },
      optionList: [
        {
          desc: '新增功能或特性',
          name: 'feature',
          emoji: '💡',
        }, {
          desc: '修复 Bug',
          name: 'fix',
          emoji: '🐞',
        }, {
          desc: '合并代码',
          name: 'merge',
          emoji: '📨',
        }, {
          desc: '重构代码',
          name: 'refactor',
          emoji: '🔨',
        }, {
          desc: '优化代码性能',
          name: 'perf',
          emoji: '🚀',
        }, {
          desc: '修改文档或注释',
          name: 'docs',
          emoji: '📖',
        }, {
          desc: '修改辅助工具',
          name: 'tool',
          emoji: '🔧',
        }, {
          desc: '修改本地开发环境配置',
          name: 'dev',
          emoji: '🔬',
        }, {
          desc: '修改持续集成',
          name: 'ci',
          emoji: '🚧',
        }, {
          desc: '添加单元测试',
          name: 'test',
          emoji: '🧪',
        }{
          desc: '创建可发布的提交',
          name: 'release',
          emoji: '📦',
        }, {
          desc: '修改代码风格',
          name: 'format',
          emoji: '📝',
        }, {
          desc: '修改 CSS 样式',
          name: 'style',
          emoji: '🎨',
        }
      ],
    }
  ],
};