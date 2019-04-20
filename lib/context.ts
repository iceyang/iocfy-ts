import DEBUG from 'debug';

import BeanFactory from './bean_factory';
import { BeanConfig, FieldConfig, PropertyConfig } from './config';
import { Scanner, ScanOption } from './scanner';

const debug = DEBUG('iocfy:context');

export default class ApplicationContext {
  private beanFactory: BeanFactory = new BeanFactory();
  private beanConfigs: { [beanName: string]: BeanConfig } = {};
  private fieldConfigs: { [beanName: string]: FieldConfig[] } = {};
  private propertyConfigs: { [beanName: string]: PropertyConfig[] } = {};
  private initialized: boolean = false;

  private initBean() {
    if (Object.keys(this.beanConfigs).length === 0) {
      console.warn('(iocfy) There is no bean be configured, may be you want to check again.')
    }
    for (let beanName in this.beanConfigs) {
      const beanConfig = this.beanConfigs[beanName];
      debug(`Init bean: ${beanName}`)
      this.beanFactory.set(beanName, beanConfig.newBeanInstance());
    }
  }

  private initField() {
    for (let beanName in this.fieldConfigs) {
      const bean = this.beanFactory.get(beanName);

      for (let fieldConfig of this.fieldConfigs[beanName]) {
        Reflect.defineProperty(bean, fieldConfig.getField(), {
          value: fieldConfig.getValue(), enumerable: true,
        });
      }
    }
  }

  private initProperty() {
    for (let beanName in this.propertyConfigs) {
      const beans = this.beanFactory.getByConstructorName(beanName);

      for (let propertyConfig of this.propertyConfigs[beanName]) {
        const property = propertyConfig.getProperty();
        const injectBeanName = propertyConfig.getInjectBeanName();
        const injectBean = this.beanFactory.get(injectBeanName);
        if (!injectBean) throw new Error(`bean ${injectBeanName} is not exists, please check your Inject config again`);
        beans.forEach(bean => {
          Reflect.defineProperty(bean, property, {
            value: injectBean, 
            enumerable: true,
          });
        });
      }
    }
  }

  scan(path: string, scanOption?: ScanOption) {
    Scanner(path, scanOption || { recursive: true });
  }

  init() {
    if (this.initialized)
      throw new Error('iocfy is initialized.');

    this.initBean();
    this.initField();
    this.initProperty();

    this.initialized = true;
  }

  get(beanName: string) {
    return this.beanFactory.get(beanName);
  }
  
  addBeanConfig(beanName: string, beanConfig: BeanConfig) {
    this.beanConfigs[beanName] = beanConfig;
  }

  addFieldConfig(beanName: string, fieldConfig: FieldConfig) {
    if (!this.fieldConfigs[beanName]) {
      this.fieldConfigs[beanName] = [];
    }
    this.fieldConfigs[beanName].push(fieldConfig);
  }

  addPropertyConfig(beanName: string, propertyConfig: PropertyConfig) {
    if (!this.propertyConfigs[beanName]) {
      this.propertyConfigs[beanName] = [];
    }
    this.propertyConfigs[beanName].push(propertyConfig);
  }
}
