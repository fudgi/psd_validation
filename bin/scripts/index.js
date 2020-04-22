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
    processPSDs(arrPsd);
    console.log("--------------------------------");
    console.log("Процесс завершен. Хорошего дня!");
  };

  const processPSDs = (arrPsd) => {
    for (const file of arrPsd) {
      const psd = new PSD(file, defaults);
      const foundProblems = psd.check().join("\n");
      if (foundProblems) {
        // console.log("\x1b[0m", "");
        console.log("\x1b[41m%s\x1b[0m", file, "\x1b[0m", "\x1b[31m");
        // console.log(" Проблемы:");
        console.log(foundProblems, "\x1b[0m");
        console.log("\x1b[0m", "");
      } else console.log("\x1b[32m", file, "- все хорошо", "\x1b[0m");
    }
  };

  start();
};
