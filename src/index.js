#!/usr/bin/env node

const shell = require('shelljs');
const main = require('./main');
const SettingsManager = require('./lib/SettingsManager');

const paramList = process.argv.splice(2);

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
        default: console.error('Target language is not supported');
      }
    } else {
      console.error('Target language is not supported');
    }
  }break;
  default: {
    main().then(commitMessage => {
      const command = `git commit -m "${commitMessage}"`;
      shell.exec(command);
    });
  };
}
