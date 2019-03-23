import BeanFactory from './bean_factory';

export type Constructor = { new(...args:any[]):{} };

export class BeanConfig {
  initialConstructor: Constructor;

  constructor(initialConstructor: Constructor) {
    this.initialConstructor = initialConstructor;
  }
}

export class PropertyConfig {
  beanName: string;
  property: string;
  injectBeanName: string;

  constructor(beanName: string, property: string, injectBeanName: string) {
    this.beanName = beanName;
    this.property = property;
    this.injectBeanName = injectBeanName;
  }
}

export default class ApplicationContext {
  beanFactory: BeanFactory = new BeanFactory();
  private beanConfigs: { [beanName: string]: BeanConfig } = {};
  private propertyConfigs: { [beanName: string]: PropertyConfig[] } = {};
  private initialized: boolean = false;
  
  addBeanConfig(beanName: string, beanConfig: BeanConfig) {
    this.beanConfigs[beanName] = beanConfig;
  }

  addPropertyConfig(beanName: string, propertyConfig: PropertyConfig) {
    if (!this.propertyConfigs[beanName]) {
      this.propertyConfigs[beanName] = [];
    }
    this.propertyConfigs[beanName].push(propertyConfig);
  }

  private initBean() {
    for (let beanName in this.beanConfigs) {
      const beanConfig = this.beanConfigs[beanName];
      this.beanFactory.set(beanName, new beanConfig.initialConstructor());
    }
  }

  private initProperty() {
    for (let beanName in this.propertyConfigs) {
      const bean = this.beanFactory.get(beanName);

      for (let propertyConfig of this.propertyConfigs[beanName]) {
        const { property, injectBeanName } = propertyConfig;
        const injectBean = this.beanFactory.get(injectBeanName);
        if (!injectBean) throw new Error(`bean ${injectBeanName} is not exists, please check your Inject config again`);
        Reflect.defineProperty(bean, property, {
          value: injectBean, 
          enumerable: true,
        });
      }
    }
  }

  init() {
    if (this.initialized)
      throw new Error('iocfy is initialized.');

    this.initBean();
    this.initProperty();

    this.initialized = true;
  }
}

