declare type Constructor = {
    new (...args: any[]): {};
};
declare class BeanConfig {
    initialConstructor: Constructor;
    properties: {
        [index: string]: string;
    };
    beans: {
        [index: string]: string;
    };
    constructor(initialConstructor: Constructor);
}
declare class ApplicationConfig {
    private beanConfigs;
    addBeanConfig(name: string, beanConfig: BeanConfig): void;
}
declare const applicationConfig: ApplicationConfig;
declare function Bean<T extends Constructor>(constructor: T): void;
declare const propertyMetadataKey: unique symbol;
declare function Inject(beanName?: string): (target: any, setter: string, descriptor: PropertyDescriptor) => void;
declare class PersonDao {
}
declare class PersonService {
    name: string;
    personDao: PersonDao;
    private setPersonDao;
}
