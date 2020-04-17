const fs = require("fs");
const path = require("path");

const createFolder = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const isIncluded = (replacedName, list) =>
  list.some((item) => replacedName.includes(item));

const findPSD = (dirname) => {
  let arrPsd;
  try {
    arrPsd = fs
      .readdirSync(dirname)
      .filter((slide) => path.extname(slide) === ".psd");
  } catch (err) {
    console.warn("\x1b[41m", "Неверно задана папка для поиска");
    console.log("\x1b[0m");
    console.log(err);
    process.exit(0);
  }

  if (arrPsd.length === 0) {
    console.warn("\x1b[41m", "В этой папке нет psd", path.resolve(dirname));
    console.log("\x1b[0m");
    // console.log(err);
    process.exit(0);
  }
  return arrPsd;
};

module.exports = { createFolder, isIncluded, findPSD };
