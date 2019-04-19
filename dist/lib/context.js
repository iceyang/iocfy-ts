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
    newBeanInstance() {
        return new this.initialConstructor();
    }
}
exports.BeanConfig = BeanConfig;
class FieldConfig {
    constructor(beanName, field, value) {
        this.beanName = beanName;
        this.field = field;
        this.value = value;
    }
    getField() { return this.field; }
    getValue() { return this.value; }
}
exports.FieldConfig = FieldConfig;
class PropertyConfig {
    constructor(beanName, property, injectBeanName) {
        this.beanName = beanName;
        this.property = property;
        this.injectBeanName = injectBeanName;
    }
    getProperty() { return this.property; }
    getInjectBeanName() { return this.injectBeanName; }
}
exports.PropertyConfig = PropertyConfig;
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
            debug_1.default('iocfy')(`Init bean: ${beanName}.`);
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
