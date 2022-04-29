const fs = require('fs');
const path = require('path');

const settingPath = path.resolve(__dirname, '../setting.json');

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

class SettingsManager {
  constructor() {
    //
  }

  changeSettings(key, value) {
    readSetting().then((settingStr) => {
      let setting
      try {
        setting = JSON.parse(settingStr);
      } catch (error) {
        throw new Error(`The format of setting file is incorrect.\nPlease check ${settingPath}\n${error.toString()}`);
      }

      if (setting) {
        setting[key] = value;
        return setting;
      }
    }).then((newSetting) => {
      return writeSetting(JSON.stringify(newSetting, null, 2));
    }).then(() => {
      console.log('Change settings successfully!');
    }).catch((err) => {
      console.error(err);
    });
  }

  switchToCN() {
    this.changeSettings('lang', 'cn');
  }

  switchToEN() {
    this.changeSettings('lang', 'en');
  }
}

module.exports = new SettingsManager();