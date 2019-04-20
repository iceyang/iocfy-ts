"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('iocfy:scanner');
function isTargerFileType(filepath, filetypes) {
    const regStr = `\\.(${filetypes.join('|')})$`;
    const reg = new RegExp(regStr);
    return reg.test(filepath);
}
function load(filepath, option) {
    const stat = fs_1.default.statSync(filepath);
    if (stat.isFile() && isTargerFileType(filepath, option.filetypes)) {
        debug(`load file: ${filepath}`);
        require(filepath);
        return;
    }
    if (!option.recursive)
        return;
    if (stat.isDirectory()) {
        const files = fs_1.default.readdirSync(filepath);
        files.forEach(filename => {
            load(path_1.default.normalize(filepath + '/' + filename), option);
        });
    }
}
function Scanner(filepath, option) {
    if (!fs_1.default.existsSync(filepath)) {
        throw new Error(`filepath ${filepath} is not exists`);
    }
    load(filepath, option);
}
exports.Scanner = Scanner;
exports.default = Scanner;
