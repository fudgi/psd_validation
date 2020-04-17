const psdConvDefaults = require("./defaults");
const package = require("../../package.json");
const { findPSD } = require("./helpers");
const { PSD } = require("./psd");

const defaults = {
  ...psdConvDefaults,
};

module.exports = function (callDir = defaults.callDir) {
  const start = () => {
    defaults.callDir = callDir + "/";
    console.log("PSDVALID@" + package.version);
    console.log("\nЗдравствуй! Сейчас я проверю все макеты.\n");
    const arrPsd = findPSD(callDir);
    if (!arrPsd.length) return;
    console.log("Нашел:", arrPsd);
    console.log("--\n");
    processPSDs(arrPsd);
    console.log("--------------------------------");
    console.log("Процесс завершен. Хорошего дня!");
  };

  const processPSDs = (arrPsd) => {
    for (const file of arrPsd) {
      console.log("Работаю с :", file);
      const psd = new PSD(file, defaults);
      const foundProblems = psd.check().join(".\n");
      if (foundProblems) {
        console.log(`Проблемы:`);
        console.log(foundProblems);
        console.log("--\n");
      }
    }
  };

  start();
};
