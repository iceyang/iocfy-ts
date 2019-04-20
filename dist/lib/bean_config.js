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
exports.default = BeanConfig;
