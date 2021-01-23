#!/usr/bin/env node

const chalk = require('chalk');
const shell = require('shelljs');
const config = require('./getConfig');
const askQuestions = require('./askQuestions');
const operateSetting = require('./operateSetting');

const dev = false;

const paramList = process.argv.splice(2);

switch (paramList[0]) {
  case 'lang': {
    operateSetting.changeLang(paramList[1]);
  }break;
  default: {
    askQuestions().then(messageList => {
      if (dev) {
        console.log(messageList);
      } else {
        const splitStr = config.insertEmptyLine ? '\n\n' : '\n';
        const commitMessage = messageList.join(splitStr);
        const command = `git commit -m "${commitMessage}"`;
        shell.exec(command);
      }
    });
  };
}
