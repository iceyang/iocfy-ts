"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BeanFactory {
    constructor() {
        this.beans = {};
        this.beans2 = {};
    }
    set(name, bean) {
        const constructorName = bean.constructor.name;
        this.beans[name] = bean;
        if (!this.beans2[constructorName])
            this.beans2[constructorName] = [];
        this.beans2[constructorName].push(bean);
    }
    get(name) {
        return this.beans[name];
    }
    getByConstructorName(name) {
        return this.beans2[name];
    }
}
exports.default = BeanFactory;
