#!/usr/bin/env node


const chalk = require("chalk");
const shell = require("shelljs");
const generateQuestions = require('./generateQuestions');
const config = require('./getConfig');

const dev = false;

function runGitCommit(messageList) {
  const splitStr = config.insertEmptyLine ? '\n\n' : '\n';
  const commitMessage = messageList.join(splitStr);
  // console.log(commitMessage);
  const command = `git commit -m "${commitMessage}"`;
  // shell.cd('~/Private/web-lab');
  const result = shell.exec(command);
  // console.log('result: ', result);
}

// console.log(generateQuestions);
generateQuestions.then(res => {
  if (dev) {
    console.log(res);
  } else {
    runGitCommit(res);
  }
});