const inquirer = require('inquirer');
const configManager = require('./lib/ConfigManager');
const { i18n } = require('./i18n');

const config = configManager.getConfig();

function getQuestionType(type) {
  const qType = {
    input: 'input',
    select: 'list',
  }[type];

  if (!qType) {
    throw new Error(`Type(${type}) is not supported.`);
  }

  return qType;
}

function replaceByList(originStr, replaceList) {
  return replaceList.reduce((str, repConfig) => {
    return str.replace(`{${repConfig.placeholder}}`, repConfig.value);
  }, originStr);
}

function generateQuestions() {
  return config.inputList.reduce((list, configItem) => {
    const item = {
      type: getQuestionType(configItem.type),
      name: configItem.name,
      message: configItem.question,
    };

    const validation = configItem.validation || {};

    switch (configItem.type) {
      case 'input': {
        item.validate = function(value, answer) {
          if (validation.required) {
            if (value.length === 0) {
              return replaceByList(
                i18n.errorMsg.required,
                [{ placeholder: 'name', value: configItem.name }],
              );
            }
          }
  
          if (validation.maxLength) {
            if (value.length > validation.maxLength) {
              return replaceByList(
                i18n.errorMsg.maxLength,
                [
                  { placeholder: 'name', value: configItem.name },
                  { placeholder: 'maxLength', value: validation.maxLength },
                ],
              );
            }
          }
          
          return true;
        };
        item.transformer = function(value, answer, option) {
          return `(${value.length}/${validation.maxLength})\n> ${value}`;
        };
      }break;
      case 'select': {
        item.choices = configItem.optionList.map(item => {
          return {
            name: item.text,
            value: item.value,
            short: `\n> ${item.value}`,
          }
        });
      }break;
      default: ;
    }

    list.push(item);
    return list;
  }, []);
}

module.exports = function() {
  const question = generateQuestions();
  return inquirer.prompt(question).then(result => {
    const list = config.inputList.reduce((list, configItem) => {
      const validation = configItem.validation || {};
      let value = result[configItem.name];
      if (validation.required) {
        value = value || configItem.defaultValue || '';
      }
      if (configItem.template) {
        value = value ? configItem.template.replace(new RegExp(`<${configItem.name}>`, 'g'), value) : '';
      }
      list.push({ name: configItem.name, value });
      return list;
    }, []);

    let msg = '';
    if (config.template) {
      msg = config.template;
      list.forEach(item => {
        msg = msg.replace(new RegExp(`<${item.name}>`, 'g'), item.value);
      });
    } else {
      msg = list.map(item => item.value).join('\n');
    }
    return msg;
  });
}