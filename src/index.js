#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");

// const command = `git commit -m "
// 💡 test modify

// a test modify

// no breaking change
// "`;
// shell.cd('~/Private/web-lab');
// const result = shell.exec(command);
// console.log('result: ', result);

const questions = [
  {
    type: "list",
    name: "type",
    message: "What is the file extension?",
    choices: [".rb", ".js", ".php", ".css"],
    filter: function(val) {
      return val.split(".")[1];
    }
  },
  {
    name: "FILENAME",
    type: "input",
    message: "What is the name of the file without extension?",
    prefix: '🚧',
    suffix: '🚧',
    validate: (value, answer) => {
      // console.log(value.length);
      return value.length <= 5 || 'length error';
    },
    transformer: (value, answer, option) => {
      const len = value.length;
      // let val = '';
      // if (len > 5) {
      //   val = value.slice(0, 5);
      // } else {
      //   val = value;
      // }
      return `(${len}/5)\n> ${value}`;
    },
  },
  {
    type: "list",
    name: "EXTENSION",
    message: "What is the file extension?",
    choices: [".rb", ".js", ".php", ".css"],
    filter: function(val) {
      return val.split(".")[1];
    }
  }
];
inquirer.prompt(questions).then(res => {
  console.log(res);
});