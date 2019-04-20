export declare type Constructor = {
    new (...args: any[]): {};
};
export declare class BeanConfig {
    private initialConstructor;
    constructor(initialConstructor: Constructor);
    newBeanInstance(): object;
}
export default BeanConfig;
