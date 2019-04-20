"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
