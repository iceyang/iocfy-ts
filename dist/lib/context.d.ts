import { BeanConfig, FieldConfig, PropertyConfig } from './config';
import { ScanOption } from './scanner';
export default class ApplicationContext {
    private beanFactory;
    private beanConfigs;
    private fieldConfigs;
    private propertyConfigs;
    private initialized;
    private initBean;
    private initField;
    private initProperty;
    scan(path: string, scanOption?: ScanOption): void;
    init(): void;
    get(beanName: string): object;
    addBeanConfig(beanName: string, beanConfig: BeanConfig): void;
    addFieldConfig(beanName: string, fieldConfig: FieldConfig): void;
    addPropertyConfig(beanName: string, propertyConfig: PropertyConfig): void;
}
