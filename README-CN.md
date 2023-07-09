# git-cm

![Static Badge](https://img.shields.io/badge/node->=14.18.0-blue)
![Static Badge](https://img.shields.io/badge/version-0.0.1-green)
![Documentation](https://img.shields.io/badge/documentation-yes-green)
![License](https://img.shields.io/badge/license-MIT-green)

git-cm 是一个格式化 `git commit` 信息的命令行工具。
它通过在命令行中的一系列询问来收集 `commit` 的信息，最后将这些信息拼接成最终的 `commit message`，并执行 `git commit -m <message>`。

**git-cm 使用了 @inquirer/prompts，要求 node 版本 >=14.18.0**

### 安装
```shell
npm i git-cm
# or
yarn add git-cm
# or
pnpm add git-cm
```

### 配置
首先需要在项目根目录下创建一个名为 `gitcm.config.js` 的配置文件，配置示例如下：
```javascript
module.exports = {
  // questionList 用于配置需要收集的 commit 信息
  questionList: [
    {
      name: 'type',
      question: '本次修改属于什么类型？',
      type: 'select',

      // optionList 是一个对象数组
      // text - 该 option 的显示文本
      // value - 该 option 的值
      // desc - 是选择 option 时显示在最下方的描述，为可选字段，默认为空字符串
      optionList: [
        {
          text: '💡 feature:  新增功能或特性',
          value: '💡 feature',
          // desc: '', // 
        },
        {
          text: '🐞 fix:      修复 Bug',
          value: '🐞 fix'
        },
        {
          text: '📨 merge:    合并代码',
          value: '📨 merge'
        },
        {
          text: '🔨 refactor: 重构代码',
          value: '🔨 refactor'
        },
        {
          text: '🚀 perf:     优化代码性能',
          value: '🚀 perf'
        },
        {
          text: '📖 docs:     修改文档或注释',
          value: '📖 docs'
        },
        {
          text: '🔧 tool:     修改辅助工具',
          value: '🔧 tool'
        },
        {
          text: '🔬 dev:      修改开发环境配置',
          value: '🔬 dev'
        },
        {
          text: '🚧 ci:       修改持续集成',
          value: '🚧 ci'
        },
        {
          text: '🧪 test:     添加单元测试',
          value: '🧪 test'
        },
        {
          text: '📦 release:  创建可发布的提交',
          value: '📦 release'
        },
        {
          text: '📝 format:   修改代码风格',
          value: '📝 format'
        },
        {
          text: '🎨 style:    修改 CSS 样式',
          value: '🎨 style'
        }
      ]
    },
    {
      name: 'scope',
      type: 'select',
      question: '本次修改涉及哪些业务模块？',

      // optionList 的子项也可以是字符串
      // 表示 text 和 value 的值一样，而 desc 则为空字符串
      optionList: [
        '用户',
        '管理员',
        '配置',
        '其他'
      ]
    },
    {
      name: 'desc',
      type: 'input',
      question: '本次修改的简单描述',
      validation: {
        minLength: 3, // 默认为 0
        maxLength: 30 // 默认为 50
      }
    },
    {
      name: 'detail',
      type: 'input',
      question: '本次修改的详细说明',
      validation: {
        maxLength: 200
      }
    }
  ],

  // format 函数在收集了 commit 的信息后运行，用于格式化信息
  // 其参数是一个对象，包含的属性就是在 questionList 中配置的内容
  // 此处是 type, scope, desc, detail，它们的值都是字符串
  format({ type, scope, desc, detail }) {

    // 你也可以在该函数中校验 commit 信息
    // 若校验不通过，则可以通过抛出一个错误来终止提交
    // if (condition) {
    //   throw new Error('...');
    // }

    return `${type}(${scope}): ${desc}\n${detail}`;
  }
}
```

你可以通过 `questionList` 来配置自己需要的属性。比如，你可能并不需要 `detail` 属性，或者你可能会需要新增一个 `issue` 属性表示该提交对应的 issue 是什么。

### 使用

```shell
> git add .
...

> git-cm
...
```

如果想要测试生成的提交信息是否正确，可以带上 `test` 参数，这样会直接输出提交信息，而不会执行 `git commit -m <message>`
```shell
> git-cm test
...
```

### License
MIT