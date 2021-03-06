const PSDLib = require("../../compiled/psd.js");

class PSD {
  constructor(filename, defaults) {
    this.defaults = defaults;
    this.path = `${defaults.callDir}${filename}`;
    this.psd = PSDLib.fromFile(this.path);

    this.isRefAppeared = false;
    this.layerNames = [];
    this.problemsList = [];
  }
  checkSize() {
    const width = this.layers.get("width");
    const height = this.layers.get("height");
    if (
      !this.defaults.sizes.some(
        (size) => width == size.width && height == size.height
      )
    ) {
      this.setProblem("Разрешение файла нестандратное");
    }
  }
  check() {
    this.layers = this.parsePSD();
    this.checkSize();
    this.sortOutLayers(this.layers.children());
    if (!this.isRefAppeared) {
      this.setProblem("Нет слоя ref или noref");
    }
    return this.problemsList;
  }
  parsePSD() {
    this.psd.parse();
    return this.psd.tree();
  }
  sortOutLayers(nodes) {
    for (const node of nodes) {
      if (node.isLayer()) this.checkLayer(node);
      if (node.isGroup()) this.sortOutLayers(node.children());
    }
  }
  checkLayer(layer) {
    this.checkLayerName(layer);
    if (this.defaults.refsLayes.includes(layer.name.toLowerCase())) {
      this.setAndCheckRefFlag(layer);
      this.getText(layer);
    } else {
      //слой не реф
      this.checkForSmart(layer);
      this.checkForEmptyLayer(layer);
    }
    this.checkForMask(layer);
    this.checkBlendMode(layer);
  }
  checkLayerName({ name }) {
    const cuttedName = name.replace(/[^a-zA-Z0-9._-]/g, "");
    if (cuttedName !== name)
      this.setProblem(
        `'${name}' - имя слоя содержит кириллицу или другие непозволительные символы`
      );
  }
  checkForSmart(layer) {
    if (this.defaults.excludeSmartLayers.includes(layer.name)) return;
    if (!layer.get("infoKeys").includes("SoLd")) {
      this.setProblem(`'${layer.name}' - слой не смарт`);
    }
  }
  checkForEmptyLayer({ name, width, height }) {
    if (height == 0 || width == 0) {
      this.setProblem(`'${name}' - пустой слой`);
    }
  }
  checkForMask(layer) {
    const { width, height, size } = layer.get("mask");
    if (size !== 0 || width || height) {
      this.setProblem(`'${layer.name}' - имеет маску`);
    }
  }
  checkBlendMode(layer) {
    const { mode } = layer.get("blendMode");
    if (mode != "normal") {
      this.setProblem(`'${layer.name}' - установлен режим наложения`);
    }
  }

  setAndCheckRefFlag(layer) {
    if (this.isRefAppeared) {
      this.setProblem(`'${layer.name}' - В макете несколько слоев ref `);
    }
    this.isRefAppeared = true;
  }
  getText(layer) {
    if (layer.name.toLowerCase() == "ref") {
      try {
        const refText = layer.get("typeTool").textValue;
        this.checkTabSign(refText);
      } catch (err) {
        this.setProblem(
          `'${layer.name}' - не удалось получить текст. возможно, слой не текстовый`
        );
      }
    }
  }
  checkTabSign(refText) {
    const match = refText.match(/\t/g);
    if (match && match.length) {
      this.setProblem("В источнике использован TAB");
    }
  }
  setProblem(problem) {
    this.problemsList.push(problem);
  }
}

module.exports = { PSD };
