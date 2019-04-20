"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function load(filepath) {
    const stat = fs_1.default.statSync(filepath);
    console.log(stat);
}
function Scanner(path) {
    load(path);
}
exports.default = Scanner;
