const PSDLib = require("../../lib");
const fs = require("fs");

class PSD {
  constructor(filename, defaults) {
    this.defaults = defaults;
    this.path = `${defaults.callDir}${filename}`;
    this.psd = PSDLib.fromFile(this.path);
    this.psd.parse();
    this.layers = this.psd.tree();
    this.isRefAppeared = false;
    this.layerNames = [];
    this.problems = [];
  }
  checkSize() {
    const width = this.layers.get("width");
    const height = this.layers.get("height");
    if (
      !this.defaults.sizes.some(
        (size) => width == size.width && height == size.height
      )
    ) {
      this.problems.push("Разрешение файла нестандратное");
    }
  }
  findLayer() {
    this.layers.forEach((layer) => {
      console.log(
        layer.get("name"),
        layer.get("infoKeys"),
        layer.get("infoKeys").includes("SoLd")
      );
    });
  }

  getProblems() {
    return this.problems;
  }
}

module.exports = { PSD };
