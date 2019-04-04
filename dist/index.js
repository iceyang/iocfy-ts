"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./lib/context"));
const context_2 = require("./lib/context");
const context = new context_1.default();
function Bean(beanName) {
    return function (constructor) {
        const name = beanName || constructor.name;
        context.addBeanConfig(name, new context_2.BeanConfig(constructor));
    };
}
exports.Bean = Bean;
function Inject(injectBeanName) {
    return function (target, property, index) {
        const beanName = target.constructor.name;
        context.addPropertyConfig(beanName, new context_2.PropertyConfig(beanName, property, injectBeanName || property));
    };
}
exports.Inject = Inject;
exports.default = context;
