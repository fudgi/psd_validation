const psdConvDefaults = require("./defaults");
const { findPSD } = require("./helpers");
const { PSD } = require("./psd");

module.exports = function () {
  const defaults = {
    ...psdConvDefaults,
  };
  let beginTime;

  const start = () => {
    const arrPsd = findPSD(defaults.callDir);
    console.log("Нашел:", arrPsd);
    beginTime = Date.now();
    processPSDs(arrPsd);
    console.log("--------------------------------");
  };

  const processPSDs = (arrPsd) => {
    console.log("--");
    for (const file of arrPsd) {
      console.log("Работаю с :", file);
      const psd = new PSD(file, defaults);
      const foundProblems = psd.check().join(".\n");
      if (foundProblems) {
        console.log(`Проблемы:`);
        console.log(foundProblems);
        console.log("--");
      }
    }
  };

  process.on("exit", () => {
    if (beginTime) {
      const endTime = Date.now();
      console.log(
        `Процесс завершен. Затраченное время: ${(
          (endTime - beginTime) /
          1000
        ).toFixed(2)} секунд`
      );
    }
  });

  start();
};
