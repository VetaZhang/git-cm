const fs = require('fs');
const { validateLang } = require('./i18n');

const settingPath = `${__dirname}/setting.json`;

function readSetting() {
  return new Promise((rs, rj) => {
    fs.readFile(settingPath, 'utf8', (err, data) => {
      if (err) rj(err);
      rs(data);
    });
  });
}

function writeSetting(newSetting) {
  return new Promise((rs, rj) => {
    fs.writeFile(settingPath, newSetting, (err) => {
      if (err) rj(err);
      rs();
    });
  });
}

const changeLang = function(newLang) {
  readSetting().then((settingStr) => {
    const setting = JSON.parse(settingStr);
    if (validateLang(newLang)) {
      setting.language = newLang;
      return setting;
    } else {
      throw `Language ${newLang} is not supported.`;
    }
  }).then((newSetting) => {
    return writeSetting(JSON.stringify(newSetting, null, 2));
  }).then(() => {
    console.log(`Switch language to ${newLang}`);
  }).catch((err) => {
    console.error(err);
  });
};

module.exports = {
  changeLang,
};