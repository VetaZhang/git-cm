# git-cm

![Static Badge](https://img.shields.io/badge/node->=14.18.0-blue)
![Static Badge](https://img.shields.io/badge/version-0.0.1-green)
![Documentation](https://img.shields.io/badge/documentation-yes-green)
![License](https://img.shields.io/badge/license-MIT-green)

git-cm is a command-line tool for formatting `git commit` messages.
It collects information about `commit` through a series of queries on the command line, and finally stitches the information together into a final `commit message` and executes `git commit -m <message>`.

**git-cm uses @inquirer/prompts, which requires node version >= 14.18.0**

### Install
```shell
npm i git-cm
# or
yarn add git-cm
# or
pnpm add git-cm
```

### Configuration
First you need to create a configuration file called `gitcm.config.js` in the project root directory, with the following sample configuration:
```javascript
module.exports = {
  // The questionList is used to configure the commit information that needs to be collected
  questionList: [
    {
      name: 'type',
      question: 'What is the type of this modification?',
      type: 'select',

      // optionList is an array of objects
      // text - Display text for this option
      // value - The value of the option
      // desc - The description displayed at the bottom when option is selected, it is an optional field and defaults to an empty string
      optionList: [
        {
          text: '💡 feature:  New feature',
          value: '💡 feature',
          // desc: ''
        },
        {
          text: '🐞 fix:      Fix bugs',
          value: '🐞 fix'
        },
        {
          text: '📨 merge:    Merge code',
          value: '📨 merge'
        },
        {
          text: '🔨 refactor: Refactor code',
          value: '🔨 refactor'
        },
        {
          text: '🚀 perf:     Improve performance',
          value: '🚀 perf'
        },
        {
          text: '📖 docs:     Modify documents',
          value: '📖 docs'
        },
        {
          text: '🔧 tool:     Update tools',
          value: '🔧 tool'
        },
        {
          text: '🔬 dev:      Modify dev config',
          value: '🔬 dev'
        },
        {
          text: '🚧 ci:       Modify CI',
          value: '🚧 ci'
        },
        {
          text: '🧪 test:     Modify unit test',
          value: '🧪 test'
        },
        {
          text: '📦 release:  Generate release pkg',
          value: '📦 release'
        },
        {
          text: '📝 format:   Format code style',
          value: '📝 format'
        },
        {
          text: '🎨 style:    Modify CSS style',
          value: '🎨 style'
        }
      ]
    },
    {
      name: 'scope',
      type: 'select',
      question: 'What business modules are involved in this modification?',

      // Items of optionList can also be strings
      // It means that text and value have the same value, while desc is the empty string
      optionList: [
        'User',
        'Admin',
        'Config',
        'Other'
      ]
    },
    {
      name: 'desc',
      type: 'input',
      question: 'Brief description of this modification',
      validation: {
        minLength: 3, // Default is 0
        maxLength: 30 // Default is 50
      }
    },
    {
      name: 'detail',
      type: 'input',
      question: 'Detailed description of this modification',
      validation: {
        maxLength: 200
      }
    }
  ],

  // The format function is run after the commit information has been collected and is used to format the information
  // Its parameter is an object containing the properties that are configured in the questionList
  // Here are 'type', 'scope', 'desc', 'detail', whose values are all strings
  format({ type, scope, desc, detail }) {

    // You can also check the commit information in this function
    // If the check does not pass, the commit can be terminated by throwing an error
    // if (condition) {
    //   throw new Error('...');
    // }

    return `${type}(${scope}): ${desc}\n${detail}`;
  }
}
```

You can configure the properties you need via the `questionList`. For example, you may not need the `detail` attribute, or you may need to add an `issue` attribute to indicate what issue the commit corresponds to.

### Usage

```shell
> git add .
...

> git-cm
...
```

If you want to test whether the generated commit message is correct, you can take the `test` argument, which will output the commit message directly instead of running `git commit -m <message>`.
```shell
> git-cm test
...
```

### License
MIT