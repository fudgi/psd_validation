const PSDLib = require("../../lib");
const fs = require("fs");

class PSD {
  constructor(filename, defaults) {
    this.defaults = defaults;
    this.path = `${defaults.callDir}${filename}`;
    this.psd = PSDLib.fromFile(this.path);
    this.psd.parse();
    // console.log(this.psd.root(), "1");
    // console.log(this.psd);
    const tree = this.psd.tree();
    // console.log(tree.export());
    let layers = tree.children();
    layers.forEach((layer) => {
      console.log(
        layer.get("name"),
        layer.get("infoKeys"),
        layer.get("infoKeys").includes("luni"),
        layer.get("infoKeys").includes("lnsr"),
        layer.get("infoKeys").includes("lyid"),
        layer.get("infoKeys").includes("clbl"),
        layer.get("infoKeys").includes("infx"),
        layer.get("infoKeys").includes("lspf"),
        layer.get("infoKeys").includes("shmd")
      );
    });
    // console.log(layers[1].export());
    // console.log(layers[4].get("metadata"));

    console.log(layers[1]);
    // console.log(layers[4].get("layerId").length);
    // console.dir(
    //   this.psd.tree().children()[1].export(),
    //   Object.keys(this.psd.tree().children()[1].export()).length
    // );
    this.isRefAppeared = false;
    this.layerNames = [];
    this.problems = [];
  }
  checkSize() {
    const width = this.psd.tree().get("width");
    const height = this.psd.tree().get("height");
    if (
      !this.defaults.sizes.some(
        (size) => width == size.width && height == size.height
      )
    ) {
      this.problems.push("Разрешение файла нестандратное");
    }
  }
  findLayer() {}
}

module.exports = { PSD };
