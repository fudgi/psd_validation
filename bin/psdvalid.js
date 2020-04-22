#!/usr/bin/env node
const { block } = require("./scripts/block.js");
const validate = require("./scripts/index.js");

const folderPath = process.argv[2];
try {
  validate(folderPath);
} catch (err) {
  console.log(err);
}
block();
