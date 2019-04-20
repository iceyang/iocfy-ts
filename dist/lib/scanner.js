"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('iocfy:scanner');
function load(filepath) {
    if (!fs_1.default.existsSync(filepath)) {
        throw new Error(`filepath ${filepath} is not exists`);
    }
    const stat = fs_1.default.statSync(filepath);
    debug('isFile: ', stat.isFile());
    debug('isDirectory: ', stat.isDirectory());
}
function Scanner(path, option) {
    load(path);
}
exports.Scanner = Scanner;
exports.default = Scanner;
