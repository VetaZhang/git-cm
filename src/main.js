const { input, select } = require('@inquirer/prompts');
const path = require('path');
const fs = require('fs');

const configFileName = 'gitcm.config.js';

function readConfig(dir, callback) {
  const configFilePath = path.resolve(dir, configFileName);

  fs.access(configFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // not exist
      if (dir === '/') {
        console.error(`Cannot find ${configFileName}`);
        return;
      } else {
        readConfig(path.resolve(dir, '../'), callback);
      }
    } else {
      // exists
      const config = require(configFilePath);
      callback(config);
    }
  });
}

async function getConfig() {
  return new Promise((resolve, reject) => {
    readConfig(process.cwd(), resolve);
  });
}

async function runForm(config) {
  let result = {};
  for (const item of config.questionList) {
    const { name, type, question, optionList, validation } = item;
    const message = question || 'No question message';
    let answer = '';

    switch (type) {
      case 'select': {
        answer = await select({
          message,
          choices: optionList.map(option => {
            let text, value, desc;

            if (typeof option === 'string') {
              text = option;
              value = option;
              desc = '';
            } else {
              text = option.text;
              value = option.value;
              desc = option.desc || '';
            }

            return {
              name: text,
              value: value,
              description: desc,
            };
          })
        });
      }break;
      default: {
        const { minLength = 0, maxLength = 50 } = validation;
        answer = await input({
          message,
          validate(string = '') {
            if (
              minLength <= string.length &&
              string.length <= maxLength
            ) {
              return true;
            } else {
              return `The length of the ${name} must be between ${minLength} and ${maxLength}`;
            }
          }
        });
      }break;
    }

    result[name] = answer;
  }

  return result;
}

module.exports = {
  async run() {
    const config = await getConfig();
    const result = await runForm(config);

    return config.format(result);
  },
  getConfig
};