export declare type Constructor = {
    new (...args: any[]): {};
};
export declare class BeanConfig {
    private initialConstructor;
    constructor(initialConstructor: Constructor);
    newBeanInstance(): object;
}
export declare class FieldConfig {
    private beanName;
    private field;
    private value;
    constructor(beanName: string, field: string, value: any);
    getField(): string;
    getValue(): any;
}
export declare class PropertyConfig {
    private beanName;
    private property;
    private injectBeanName;
    constructor(beanName: string, property: string, injectBeanName: string);
    getProperty(): string;
    getInjectBeanName(): string;
}
export default class ApplicationContext {
    private beanFactory;
    private beanConfigs;
    private fieldConfigs;
    private propertyConfigs;
    private initialized;
    private initBean;
    private initField;
    private initProperty;
    init(): void;
    get(beanName: string): object;
    addBeanConfig(beanName: string, beanConfig: BeanConfig): void;
    addFieldConfig(beanName: string, fieldConfig: FieldConfig): void;
    addPropertyConfig(beanName: string, propertyConfig: PropertyConfig): void;
}
