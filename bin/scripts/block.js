const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const block = (data) => {
  process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
  });
  rl.question(
    "Процесс завершен.Хорошего дня! Нажми [Enter], чтобы выйти\n",
    function () {
      rl.close();
      process.exit();
    }
  );
};

module.exports = {
  block,
};
