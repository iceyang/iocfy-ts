export declare type Constructor = {
    new (...args: any[]): {};
};
export declare class BeanConfig {
    initialConstructor: Constructor;
    constructor(initialConstructor: Constructor);
}
export declare class PropertyConfig {
    beanName: string;
    property: string;
    injectBeanName: string;
    constructor(beanName: string, property: string, injectBeanName: string);
}
export default class ApplicationContext {
    private beanFactory;
    private beanConfigs;
    private propertyConfigs;
    private initialized;
    get(beanName: string): object;
    addBeanConfig(beanName: string, beanConfig: BeanConfig): void;
    addPropertyConfig(beanName: string, propertyConfig: PropertyConfig): void;
    private initBean;
    private initProperty;
    init(): void;
}
