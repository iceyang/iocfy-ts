"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bean_factory_1 = __importDefault(require("./bean_factory"));
const debug_1 = __importDefault(require("debug"));
class BeanConfig {
    constructor(initialConstructor) {
        this.initialConstructor = initialConstructor;
    }
}
exports.BeanConfig = BeanConfig;
class PropertyConfig {
    constructor(beanName, property, injectBeanName) {
        this.beanName = beanName;
        this.property = property;
        this.injectBeanName = injectBeanName;
    }
}
exports.PropertyConfig = PropertyConfig;
class ApplicationContext {
    constructor() {
        this.beanFactory = new bean_factory_1.default();
        this.beanConfigs = {};
        this.propertyConfigs = {};
        this.initialized = false;
    }
    get(beanName) {
        return this.beanFactory.get(beanName);
    }
    addBeanConfig(beanName, beanConfig) {
        this.beanConfigs[beanName] = beanConfig;
    }
    addPropertyConfig(beanName, propertyConfig) {
        if (!this.propertyConfigs[beanName]) {
            this.propertyConfigs[beanName] = [];
        }
        this.propertyConfigs[beanName].push(propertyConfig);
    }
    initBean() {
        if (Object.keys(this.beanConfigs).length === 0) {
            console.warn('(iocfy) There is no bean be configured, may be you want to check again.');
        }
        for (let beanName in this.beanConfigs) {
            const beanConfig = this.beanConfigs[beanName];
            debug_1.default('iocfy')(`Init bean: ${beanName}.`);
            this.beanFactory.set(beanName, new beanConfig.initialConstructor());
        }
    }
    initProperty() {
        for (let beanName in this.propertyConfigs) {
            const bean = this.beanFactory.get(beanName);
            for (let propertyConfig of this.propertyConfigs[beanName]) {
                const { property, injectBeanName } = propertyConfig;
                const injectBean = this.beanFactory.get(injectBeanName);
                if (!injectBean)
                    throw new Error(`bean ${injectBeanName} is not exists, please check your Inject config again`);
                Reflect.defineProperty(bean, property, {
                    value: injectBean,
                    enumerable: true,
                });
            }
        }
    }
    init() {
        if (this.initialized)
            throw new Error('iocfy is initialized.');
        this.initBean();
        this.initProperty();
        this.initialized = true;
    }
}
exports.default = ApplicationContext;
