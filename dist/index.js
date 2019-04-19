"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./lib/context"));
const context_2 = require("./lib/context");
const context = new context_1.default();
function Bean(beanName, fields) {
    return function (constructor) {
        const name = beanName || constructor.name;
        context.addBeanConfig(name, new context_2.BeanConfig(constructor));
        fields && Object.keys(fields).forEach(field => {
            const value = fields[field];
            const fieldConfig = new context_2.FieldConfig(name, field, value);
            context.addFieldConfig(name, fieldConfig);
        });
    };
}
exports.Bean = Bean;
function Inject(injectBeanName) {
    return function (target, property, index) {
        const beanName = target.constructor.name;
        const propertyConfig = new context_2.PropertyConfig(beanName, property, injectBeanName || property);
        context.addPropertyConfig(beanName, propertyConfig);
    };
}
exports.Inject = Inject;
exports.default = context;
