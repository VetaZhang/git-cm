#!/usr/bin/env node

const chalk = require('chalk');
const shell = require('shelljs');
const main = require('./main');
const config = require('./lib/ConfigManager');
const SettingsManager = require('./lib/SettingsManager');
const setting = require('./setting.json');

const paramList = process.argv.splice(2);

function throwErr(wrongParam) {
  console.error(wrongParam);
}

switch (paramList[0]) {
  case 'test': {
    main().then(commitMessage => {
      console.log(`\n${commitMessage}`);
    });
  }break;
  case 'lang': {
    if (paramList[1]) {
      switch (paramList[1]) {
        case 'cn': SettingsManager.switchToCN();break;
        case 'en': SettingsManager.switchToEN();break;
        default: throwErr('Target language is not supported');
      }
    } else {
      throwErr('Target language is not supported');
    }
  }break;
  default: {
    main().then(commitMessage => {
      const command = `git commit -m "${commitMessage}"`;
      shell.exec(command);
    });
  };
}
