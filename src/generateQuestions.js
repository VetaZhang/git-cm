const inquirer = require("inquirer");
const config = require('./getConfig');
const i18n = require('./i18n');

const typeMap = {
  input: 'input',
  select: 'list',
};

function generateQuestionsByConfig() {
  return config.inputList.reduce((list, configItem) => {
    const item = {
      type: typeMap[configItem.type],
      name: configItem.key,
      message: configItem.question,
    };

    switch (configItem.type) {
      case 'input': {
        item.validate = function(value, answer) {
          if (configItem.required) {
            if (value.length === 0) {
              return i18n.errorMsg.required;
            }
          }
  
          if (configItem.maxLength) {
            if (value.length > configItem.maxLength) {
              return i18n.errorMsg.maxLength;
            }
          }
          
          return true;
        };
        item.transformer = function(value, answer, option) {
          return `(${value.length}/${configItem.maxLength})\n> ${value}`;
        };
      }break;
      case 'select': {
        item.choices = configItem.optionList.map(item => {
          return {
            name: item.label,
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

const question = generateQuestionsByConfig();

module.exports = inquirer.prompt(question).then(result => {
  return config.onConfig(result);
});