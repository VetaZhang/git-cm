#!/usr/bin/env node

const shell = require('shelljs');
const { run, getConfig } = require('./main');

const paramList = process.argv.splice(2);

switch (paramList[0]) {
  case 'test': {
    run().then(commitMessage => {
      console.log('\n', commitMessage);
    });
  }break;
  case 'config': {
    getConfig().then(config => {
      console.log(JSON.stringify(config, null, 2));
    });
  }break;
  default: {
    run().then(commitMessage => {
      const command = `git commit -m "${commitMessage}"`;
      shell.exec(command);
    });
  };
}
