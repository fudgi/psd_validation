#!/usr/bin/env node
const { block } = require("./scripts/block.js");
const validate = require("./scripts/index.js");

const folderPath = process.argv[2];
validate(folderPath);

block();
