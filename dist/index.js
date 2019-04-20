"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("./lib/context"));
const config_1 = require("./lib/config");
const context = new context_1.default();
function Bean(beanName, fields) {
    return function (constructor) {
        const name = beanName || constructor.name;
        context.addBeanConfig(name, new config_1.BeanConfig(constructor));
        fields && Object.keys(fields).forEach(field => {
            const value = fields[field];
            const fieldConfig = new config_1.FieldConfig(name, field, value);
            context.addFieldConfig(name, fieldConfig);
        });
    };
}
exports.Bean = Bean;
function Inject(injectBeanName) {
    return function (target, property, index) {
        const beanName = target.constructor.name;
        const propertyConfig = new config_1.PropertyConfig(beanName, property, injectBeanName || property);
        context.addPropertyConfig(beanName, propertyConfig);
    };
}
exports.Inject = Inject;
exports.default = context;
