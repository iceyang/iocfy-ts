"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BeanFactory {
    constructor() {
        this.beans = {};
    }
    set(name, bean) {
        this.beans[name] = bean;
    }
    get(name) {
        return this.beans[name];
    }
}
exports.default = BeanFactory;
