"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const bean_factory_1 = __importDefault(require("./bean_factory"));
const scanner_1 = require("./scanner");
const debug = debug_1.default('iocfy:context');
class ApplicationContext {
    constructor() {
        this.beanFactory = new bean_factory_1.default();
        this.beanConfigs = {};
        this.fieldConfigs = {};
        this.propertyConfigs = {};
        this.initialized = false;
    }
    initBean() {
        if (Object.keys(this.beanConfigs).length === 0) {
            console.warn('(iocfy) There is no bean be configured, may be you want to check again.');
        }
        for (let beanName in this.beanConfigs) {
            const beanConfig = this.beanConfigs[beanName];
            debug(`Init bean: ${beanName}`);
            this.beanFactory.set(beanName, beanConfig.newBeanInstance());
        }
    }
    initField() {
        for (let beanName in this.fieldConfigs) {
            const bean = this.beanFactory.get(beanName);
            for (let fieldConfig of this.fieldConfigs[beanName]) {
                Reflect.defineProperty(bean, fieldConfig.getField(), {
                    value: fieldConfig.getValue(), enumerable: true,
                });
            }
        }
    }
    initProperty() {
        for (let beanName in this.propertyConfigs) {
            const beans = this.beanFactory.getByConstructorName(beanName);
            for (let propertyConfig of this.propertyConfigs[beanName]) {
                const property = propertyConfig.getProperty();
                const injectBeanName = propertyConfig.getInjectBeanName();
                const injectBean = this.beanFactory.get(injectBeanName);
                if (!injectBean)
                    throw new Error(`bean ${injectBeanName} is not exists, please check your Inject config again`);
                beans.forEach(bean => {
                    Reflect.defineProperty(bean, property, {
                        value: injectBean,
                        enumerable: true,
                    });
                });
            }
        }
    }
    scan(path, scanOption) {
        const recursive = scanOption && scanOption.recursive || true;
        const filetypes = scanOption && scanOption.filetypes || ['js'];
        scanner_1.Scanner(path, { recursive, filetypes });
    }
    init() {
        if (this.initialized)
            throw new Error('iocfy is initialized.');
        this.initBean();
        this.initField();
        this.initProperty();
        this.initialized = true;
    }
    get(beanName) {
        return this.beanFactory.get(beanName);
    }
    addBeanConfig(beanName, beanConfig) {
        this.beanConfigs[beanName] = beanConfig;
    }
    addFieldConfig(beanName, fieldConfig) {
        if (!this.fieldConfigs[beanName]) {
            this.fieldConfigs[beanName] = [];
        }
        this.fieldConfigs[beanName].push(fieldConfig);
    }
    addPropertyConfig(beanName, propertyConfig) {
        if (!this.propertyConfigs[beanName]) {
            this.propertyConfigs[beanName] = [];
        }
        this.propertyConfigs[beanName].push(propertyConfig);
    }
}
exports.default = ApplicationContext;
